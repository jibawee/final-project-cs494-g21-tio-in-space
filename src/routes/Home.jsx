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
                distance: Number(inMetric ? closeData.miss_distance.kilometers : closeData.miss_distance.miles).toLocaleString('en-US', {maximumFractionDigits: 2}), // to use unit setting
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
                flex min-w-1/3 flex-col">
                <div>

                    <div className="border-2 border-white min-h-1/3 h-32 p-2 m-2 text-center space-y-2 pt-4">
                        <h1 className="font-bold text-xl pt-1">
                        {(new Date()).toLocaleDateString()}
                        </h1>
                        <div>
                                <CountUp
                                from={0}
                                to={neoData.length}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                                startCounting={false}
                                />
                                <p>
                                Asteroids Ahoy!
                                </p>
                        </div>    
                    </div>

                    <div className="
                        pt-4
                        font-bold
                        p-2
                        h-70
                        border-2 border-white p-2 m-2
                        flex flex-col space-y-4
                        text-center
                    ">
                        <div>
                            <h1 className="text-xl pb-2">
                                Nearest Today
                            </h1>
                        </div>
                        <div>
                           <img src="../src/icons/asteroid_flying.png" className="w-14 h-14 inline pb-2"/> 
                           <p className="text-lg">{neoData && neoData[0].name}</p>
                        </div>
                        <div>
                            <p className="font-normal">
                            Distance:
                            </p>
                            <p className="font-normal">
                            {neoData && (neoData[0].distance)} 
                            </p>
                            <p className="font-normal">{neoData[0].distanceUnit} away</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-w-2/3  float-right ">
                <div className="
                    border-2 border-white 
                    p-2 m-2 
                    overflow-y-auto
                    text-center
                    h-108
                ">
                    <h1 className="text-2xl">
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
