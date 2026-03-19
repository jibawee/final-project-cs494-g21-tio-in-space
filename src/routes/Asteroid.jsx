import { useState } from "react";
import { useLoaderData } from "react-router";

export function asteroidLoader({ params, request }) {
    return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${import.meta.env.VITE_KEY}`)
}

export default function Asteroid() {

    const neoData = useLoaderData()
    let units = window.localStorage.getItem("units") ?? "metric"
    let inMetric = units == "metric"
    const [ onWatchlist, setOnWatchlist ] = useState(JSON.parse(window.localStorage.getItem("watchlist") ?? "[]").includes(neoData.id))

    console.log(JSON.parse(window.localStorage.getItem("watchlist") ?? "[]"))

    function convertAu(au) {
        return inMetric ? au * 149597870.7 : au * 92955807.273026
    }
    
    return (
        <div className="mx-10 justify-items-center">
            <button 
                className="
                    border-2 border-white text-xl py-2
                    min-w-1/5
                    my-4
                    hover:bg-gray-800 hover:cursor-pointer
                    flex justify-center
                "
                onClick={(e) => {
                    let watchlist = JSON.parse(window.localStorage.getItem("watchlist") ?? "[]")
                    if (watchlist.includes(neoData.id)) {
                        watchlist = watchlist.filter(id => id !== neoData.id)
                    } else {
                        watchlist.push(neoData.id)
                    }
                    window.localStorage.setItem("watchlist", JSON.stringify(watchlist))
                    setOnWatchlist(w => !w)
                }}
            >{onWatchlist ? <div className="text-red-500">Remove from watchlist</div> : "Add to watchlist"}</button>

            <div className="flex flex-col gap-5">
                <div>
                    <span className="asteroid-identity">
                        {`Asteroid Name: `}
                    </span>
                    <span className="asteroid-value">{
                        (neoData.name[0] == "(") ? neoData.name.substring(1,neoData.name.length-1) : neoData.name
                    }</span>
                </div>

                {neoData.is_potentially_hazardous_asteroid ? 
                    <span className="text-xl text-red-500">Hazardous</span> : 
                    <span className="text-xl text-green-500">Not Hazardous</span>
                }


                {/*I want a break here */}

                <div>
                    <span className="asteroid-identity">
                        {`Orbit Class: `}
                    </span>
                    <span className="asteroid-value">
                        {neoData.orbital_data.orbit_class.orbit_class_description}
                    </span>
                </div>

                <div>
                    <span className="asteroid-identity">
                        {`Orbital Period: `}
                    </span>
                    
                    <span className="asteroid-value">
                        {Number(neoData.orbital_data.orbital_period).toFixed(2) + " days"}
                    </span>
                </div>

                <div>
                    <span className="asteroid-identity">
                        {`Orbit Perihelion: `}
                    </span>
                    <span className="asteroid-value">
                        {convertAu(Number(neoData.orbital_data.perihelion_distance)).toFixed(2) + (inMetric ? "km" : " miles")}
                    </span>
                </div>

                <div>
                    <span className="asteroid-identity">
                        {`Orbit Aphelion: `}
                    </span>
                    <span className="asteroid-value">
                        {convertAu(Number(neoData.orbital_data.aphelion_distance)).toFixed(2) + (inMetric ? "km" : " miles")}
                    </span>
                </div>

                {/*I want a break here */}

                <div>
                    <span className="asteroid-identity">
                        {`First Observed: `}
                    </span>

                    <span className="asteroid-value">
                        {neoData.orbital_data.first_observation_date}
                    </span>
                    
                </div>

                <div>
                    <span className="asteroid-identity">
                        {`Last Observed: `}
                    </span>
                    <span className="asteroid-value">
                        {neoData.orbital_data.last_observation_date}
                    </span>
                </div>

            </div>
            
        </div>
    )
}
