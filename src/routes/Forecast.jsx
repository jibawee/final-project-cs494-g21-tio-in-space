import { redirect, useLoaderData, useNavigate, useParams } from "react-router";
import AsteroidItem from "../components/AsteroidItem";

function getEndDate(start) {
    const [year, month, day] = start.split("-").map(Number)
    let endDate = new Date(year, month - 1, day)
    endDate.setDate(endDate.getDate() + 7)
    return endDate
}

function formatDate(d) {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().substring(0,10)
}

export function forecastLoader({ params, request }) {
    let { start } = params
    if (!start) {
        const today = new Date()
        start = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().substring(0,10)
        throw redirect(`/forecast/${start}`)
    }
    let end = formatDate(getEndDate(start))
    return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${import.meta.env.VITE_KEY}`)
}

export default function Forecast() {
    const { start } = useParams()
    const navigate = useNavigate()

    let end = getEndDate(start)

    const resultData = useLoaderData()
    console.log(resultData)
    let neoData;
    let units = window.localStorage.getItem("units") ?? "metric"
    let inMetric = units == "metric"
    neoData = { ...resultData.near_earth_objects }
    if (neoData) {
        Object.keys(neoData).forEach((day) => {
            neoData[day] = neoData[day].map((a) => {
                let aName = a.name
                if (a.name[0] == "(") {
                    aName = aName.substring(1,a.name.length-1)
                }
                let closeData = a.close_approach_data.find(e => e.close_approach_date == day)
                return ({
                    id: a.id,
                    name: aName,
                    isHazardous: a.is_potentially_hazardous_asteroid,
                    distance: Number(inMetric ? closeData.miss_distance.kilometers : closeData.miss_distance.miles).toLocaleString('en-US', {maximumFractionDigits: 2}),
                    distanceUnit: inMetric ? "km" : " miles",
                    speed: Number(inMetric ? closeData.relative_velocity.kilometers_per_hour : closeData.relative_velocity.miles_per_hour).toFixed(2),
                    speedUnit: inMetric ? "kph" : "mph",
                    diameterMax: Number(inMetric ? a.estimated_diameter.meters.estimated_diameter_max : a.estimated_diameter.feet.estimated_diameter_max).toFixed(2),
                    diameterMaxUnit: "ft",
                })
            })
            neoData[day].sort((a, b) => a.distance - b.distance)
        })
    }
    console.log(neoData)

    return (
        <>
            <div className="mb-2">
                <h1 className="text-3xl font-bold m-4 text-center">Forecast</h1>
                <div className="flex items-center justify-center mb-4 text-xl">
                    <input className="font-bold" type="date" value={start} onChange={(e) => navigate(`/forecast/${e.target.value}`)} />
                    <p>{`to ${end.toLocaleDateString()}`}</p>
                </div>
            </div>


            <div className="flex justify-center h-screen ">
                    <div className="h-full w-2/3 overflow-y-auto ">
                        {neoData && Object.entries(neoData)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([date, asteroids]) => (
                            <details key={date} className="mb-2 open:overflow-y-auto border-2 border-white open:max-h-100">
                            <summary className="text-lg cursor-pointer sticky top-0 bg-black">{date}</summary>
                            {asteroids.map(asteroid => (
                                <AsteroidItem key={asteroid.id} asteroid={asteroid} />
                            ))}
                            </details>
                        ))
                        }
                    </div>
                </div>
        </>
    )
}
