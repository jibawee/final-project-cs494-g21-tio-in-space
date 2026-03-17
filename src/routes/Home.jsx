import { useLoaderData } from "react-router"

export function homeLoader({ params, request }) {
    const today = (new Date()).toISOString().substring(0,10)
    return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_KEY}`)
}

export default function Home() {

    const resultData = useLoaderData()
    console.log(resultData)

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
            </>
        </div>
    )
}
