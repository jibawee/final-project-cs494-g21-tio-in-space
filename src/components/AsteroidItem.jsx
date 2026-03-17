export default function AsteroidItem({ asteroid }) {
    // asteroid is retrieved from neoData.map() in Home.jsx

    return (
        <>
            <h1>
                {asteroid.name}
            </h1>

            <p className="
            sm:hidden md:block 
            ">
                Dist: {asteroid.distance}{asteroid.distanceUnit}
            </p>

            {asteroid.isHazardous && <img src="../src/icons/watchlist_icon.png"></img> && <div>yeah this is hazardous</div>}

            {!asteroid.isHazardous && <div>no it's not hazardous</div>}
        </>
    )
}