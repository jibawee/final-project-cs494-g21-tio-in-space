export default function AsteroidItem({ asteroid }) {
    // asteroid is retrieved from neoData.map() in Home.jsx

    return (
        <>
            <h1>
                {asteroid.name}
            </h1>

            <p>
                Dist: {asteroid.distance}{asteroid.distanceUnit}
            </p>

            {asteroid.isHazardous && <img>
                {/*Placeholder for icon of if hazardous. */}
            </img> && <div>yeah this is hazardous</div>}

            {!asteroid.isHazardous && <div>no it's not hazardous</div>}
        </>
    )
}