import { useLoaderData } from "react-router"

import AsteroidItem from "../components/AsteroidItem"

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
                distance: Number(closeData.miss_distance.kilometers).toFixed(2), // to use unit setting
                distanceUnit: "km",
                speed: closeData.relative_velocity.kilometers_per_hour,
                speedUnit: "kph",
                diameterMax: a.estimated_diameter.meters.estimated_diameter_max ,
                diameterMaxUnit: "m",
            })
        })
    }
    neoData.sort((a, b) => a.distance - b.distance)
    console.log(neoData)

    return (
        <div>
            Home

            <>
                <h1>
                   {(new Date()).toLocaleDateString()}
                </h1>
                <p>
                    Asteroids near earth:
                </p>
                <p>
                    {neoData.length}
                </p>
            </>

            <>
                <h1>
                    Nearest Today
                </h1>
                <img src=""/>

                <p>
                    {neoData && neoData[0].name}
                </p>
                <p>
                    Dist: {neoData && (neoData[0].distance + neoData[0].distanceUnit)}
                </p>
            </>

            <>
                <h1>
                    Today's Near Earth Asteroids:
                </h1>

                <ul>
                    {neoData && neoData.map(asteroid => (
                        <AsteroidItem key={asteroid.id} asteroid={asteroid}/>
                    ))}
                </ul>


            </>
        </div>
    )
}
