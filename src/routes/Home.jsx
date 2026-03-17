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
        </div>
    )
}
