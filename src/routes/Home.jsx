import { useLoaderData } from "react-router"
import CountUp from '../components/CountUp'

import AsteroidItem from "../components/AsteroidItem"

export function homeLoader({ params, request }) {
    const today = (new Date()).toISOString().substring(0,10)
    return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_KEY}`)
}

export default function Home() {
    const resultData = useLoaderData()
    let neoData;
    let today;
    let units = window.localStorage.getItem("units") ?? "metric"
    let inMetric = units == "metric"
    if (resultData && resultData.near_earth_objects) {
        today = Object.keys(resultData.near_earth_objects)[0]
        neoData = resultData.near_earth_objects[today]
    }
    if (neoData) {
        neoData = neoData.map((a) => {
            let closeData = a.close_approach_data.find(e => e.close_approach_date == today)
            return ({
                id: a.id,
                name: a.name.substring(1,a.name.length-1),
                isHazardous: a.is_potentially_hazardous_asteroid,
                distance: Number(inMetric ? closeData.miss_distance.kilometers : closeData.miss_distance.miles).toFixed(2), // to use unit setting
                distanceUnit: inMetric ? "km" : " miles",
                speed: Number(inMetric ? closeData.relative_velocity.kilometers_per_hour : closeData.relative_velocity.miles_per_hour).toFixed(2),
                speedUnit: inMetric ? "kph" : "mph",
                diameterMax: Number(inMetric ? a.estimated_diameter.meters.estimated_diameter_max : a.estimated_diameter.feet.estimated_diameter_max).toFixed(2),
                diameterMaxUnit: "ft",
            })
        })
    }
    neoData.sort((a, b) => a.distance - b.distance)

    return (
        <div className="flex">

            <div className="
                flex min-w-1/3 flex-col
            ">
                <div className="

                ">


                    <div className="border-2 border-white min-h-1/3 p-2 m-2">
                        <h1>
                        {(new Date()).toLocaleDateString()}
                        </h1>
                        <p>
                            Asteroids near earth:
                        </p>
                            <CountUp
                            from={0}
                            to={neoData.length}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                            startCounting={false}
                            />
                    </div>

                    <div className="
                        font-bold
                        bg-black
                        p-2
                        h-2/3
                        border-2 border-white p-2 m-2
                    ">
                        <h1 className="inline">
                            Nearest Today
                        </h1>
                        <img src="../src/icons/asteroid_icon.png" className="w-6 h-6 inline"/>

                        <p>
                            {neoData && neoData[0].name}
                        </p>
                        <p className="font-normal">
                            Dist: {neoData && (neoData[0].distance + neoData[0].distanceUnit)}
                        </p>
                    </div>

                </div>

            </div>

            <div className="min-w-2/3 float-right">
                <div className="
                    border-2 border-white 
                    p-2 m-2
                ">
                    <h1 className="text-3xl">
                        Today's Near Earth Asteroids:
                    </h1>

                    <ul className="">
                        {neoData && neoData.map(asteroid => (
                            <AsteroidItem key={asteroid.id} asteroid={asteroid}/>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}
