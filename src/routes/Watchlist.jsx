import { useLoaderData } from "react-router"
import AsteroidItem from "../components/AsteroidItem"

export function watchlistLoader({ params, request }) {
    const watchlistItems = JSON.parse(window.localStorage.getItem("watchlist") ?? "[]")
    const requests = watchlistItems.map((id) => 
        fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${import.meta.env.VITE_KEY}`).then(res => res.json())
    )
    return Promise.all(requests)
}

export default function Watchlist() {

    let neoData = useLoaderData()
    console.log(neoData)
    let units = window.localStorage.getItem("units") ?? "metric"
    let inMetric = units == "metric"
    const today = new Date()
    if (neoData) {
        neoData = neoData.map((a) => {
            let aName = a.name
            if (a.name[0] == "(") {
                aName = aName.substring(1,a.name.length-1)
            }
            let closeData = a.close_approach_data
                .map(obj => ({
                    ...obj,
                    dateObj: new Date(obj.close_approach_date)
                }))
                .filter(obj => obj.dateObj < today)
                .sort((a, b) => b.dateObj - a.dateObj)[0]
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
    }
    console.log(neoData)

    return (
        <div>
            Watchlist

            <>
                <ul className="">
                    {neoData && neoData.map(asteroid => (
                        <AsteroidItem key={asteroid.id} asteroid={asteroid}/>
                    ))}
                </ul>
            </>
        </div>
    )
}
