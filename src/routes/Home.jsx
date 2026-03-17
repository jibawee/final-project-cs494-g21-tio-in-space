import { useLoaderData } from "react-router"

import AsteroidItem from "../components/AsteroidItem"
import Asteroid from "./Asteroid"

export function homeLoader({ params, request }) {
    const today = (new Date()).toISOString().substring(0,10)
    return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_KEY}`)
}

export default function Home() {
    const resultData = useLoaderData()
    let neoData;
    let today;
    if (resultData && resultData.near_earth_objects) {
        today = Object.keys(resultData.near_earth_objects)[0]
        neoData = resultData.near_earth_objects[today]
    }
    if (neoData) {
        neoData = neoData.map((a) => {
            let closeData = a.close_approach_data.find(e => e.close_approach_date == today)
            return ({
                id: a.id,
                name: a.name,
                isHazardous: a.is_potentially_hazardous_asteroid,
                distance: closeData.miss_distance.kilometers, // to use unit setting
                distanceUnit: "km",
                speed: closeData.relative_velocity.kilometers_per_hour,
                speedUnit: "kph",
                diameterMax: a.estimated_diameter.meters.estimated_diameter_max ,
                diameterMaxUnit: "m",
            })
        })
    }
    console.log(neoData)

    return (
        <div>
            Home

            <>
                <h1>
                   {/*today's date  */} Today's date
                </h1>
                <p>
                    Asteroids near earth:
                </p>
                <p>
                    {/*Number */}
                </p>
            </>

            <>
                <h1>
                    Nearest Today
                </h1>
                <img>
                    {/*Image of generic asteroid (see figma) */}
                </img>

                <p>
                    {/*Get nearest asteroid.title
                    */}
                </p>
                <p>
                    Dist: {/* asteroid.distance_in_km */} km
                </p>
            </>

            <>
                <h1>
                    Today's Near Earth Asteroids:
                </h1>

                <li>
                    {/*To map things */}
                </li>

                <AsteroidItem asteroid={neoData && neoData[0]} />


            </>
        </div>
    )
}
