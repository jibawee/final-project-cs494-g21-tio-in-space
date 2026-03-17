import { useLoaderData } from "react-router";

export function asteroidLoader({ params, request }) {
    return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${import.meta.env.VITE_KEY}`)
}

export default function Asteroid() {

    const neoData = useLoaderData()
    let units = window.localStorage.getItem("units") ?? "metric"
    let inMetric = units == "metric"

    function convertAu(au) {
        return inMetric ? au * 149597870.7 : au * 92955807.273026
    }
    
    return (
        <div>
            Asteroid
            <p>
                Name: {neoData.name}
            </p>

            <p>
                {neoData.is_potentially_hazardous_asteroid ? "Hazardous" : "Not Hazardous"}
            </p>

            <p>
                Diameter: {neoData.estimated_diameter[inMetric ? "meters" : "feet"].estimated_diameter_min.toFixed(2) + " - " + neoData.estimated_diameter[inMetric ? "meters" : "feet"].estimated_diameter_max.toFixed(2) + (inMetric ? "m" : "ft")}
            </p>

            <br></br>

            <p>
                Orbit Class: {neoData.orbital_data.orbit_class.orbit_class_description}
            </p>

            <p>
                Orbital Period: {Number(neoData.orbital_data.orbital_period).toFixed(2) + " days"}
            </p>

            <p>
                Orbit Perihelion: {convertAu(Number(neoData.orbital_data.perihelion_distance)).toFixed(2) + (inMetric ? "km" : " miles")}
            </p>

            <p>
                Orbit Aphelion: {convertAu(Number(neoData.orbital_data.aphelion_distance)).toFixed(2) + (inMetric ? "km" : " miles")}
            </p>

            <br></br>

            <p>
                First Observed: {neoData.orbital_data.first_observation_date}
            </p>

            <p>
                Last Observed: {neoData.orbital_data.last_observation_date}
            </p>
            
        </div>
    )
}
