import { useLoaderData } from "react-router"
import CountUp from '../components/CountUp'

import AsteroidItem from "../components/AsteroidItem"

export function homeLoader({ params, request }) {
    const todayDate = new Date()
    const today = new Date(todayDate.getTime() - todayDate.getTimezoneOffset() * 60000).toISOString().substring(0,10)
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
            let aName = a.name
            if (a.name[0] == "(") { // if the format's (xyz), do (xyz) => xyz as normal. Sometimes they do "ABC (xyz)" As the name. And Just leave those the same. ( bars)
                aName = aName.substring(1,a.name.length-1)
            }
            let closeData = a.close_approach_data.find(e => e.close_approach_date == today)
            return ({
                id: a.id,
                name: aName,
                isHazardous: a.is_potentially_hazardous_asteroid,
                distance: Number(inMetric ? closeData.miss_distance.kilometers : closeData.miss_distance.miles).toLocaleString('en-US', {maximumFractionDigits: 2}), // to use unit setting
                distanceUnit: inMetric ? "km" : " miles",
                speed: Number(inMetric ? closeData.relative_velocity.kilometers_per_hour : closeData.relative_velocity.miles_per_hour).toFixed(2),
                speedUnit: inMetric ? "kph" : "mph",
                diameterMax: Number(inMetric ? a.estimated_diameter.meters.estimated_diameter_max : a.estimated_diameter.feet.estimated_diameter_max).toFixed(2),
                diameterMaxUnit: "ft",
            })
        })
        neoData.sort((a, b) => a.distance - b.distance)
    }

        return (
    <div className="flex flex-wrap gap-4 p-4">

        <div className="flex flex-col gap-4 min-w-64 flex-1">

        <div className="border-2 border-white text-center p-2">
            <h1 className="font-bold text-xl pt-1">
            {(new Date()).toLocaleDateString()}
            </h1>
            <div>
            <CountUp
                from={0}
                to={neoData?.length ?? 0}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
                startCounting={false}
            />
            <p className="pb-2">Asteroids Ahoy!</p>
            </div>
        </div>

        <div className="border-2 border-white p-4 flex flex-col gap-4 text-center flex-1 items-center">
            <h1 className="text-2xl font-bold mt-8">Nearest Today</h1>
            <div>
            <img src="../src/icons/asteroid_flying.png" className="w-26 h-26 mx-auto block mb-4 mt-4" />
            <p className="text-2xl font-bold mb-6">{neoData?.[0]?.name}</p>
            </div>
            <div>
            <p>Distance:</p>
            <p className="text-2xl">{neoData?.[0]?.distance}</p>
            <p>{neoData?.[0]?.distanceUnit} away</p>
            </div>
        </div>

        </div>
        <div className="border-2 border-white min-w-64 flex-[2] flex flex-col h-150">
  
        <div className="bg-black p-2 text-center border-b-2 border-white shrink-0">
            <h1 className="text-2xl">Today's Near Earth Asteroids:</h1>
        </div>

        <ul className="overflow-y-auto flex-1">
            {neoData?.map(asteroid => (
            <AsteroidItem key={asteroid.id} asteroid={asteroid} />
            ))}
        </ul>

        </div>
    </div>
    )
}
