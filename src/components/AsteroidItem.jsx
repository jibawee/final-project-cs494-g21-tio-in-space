export default function AsteroidItem({ asteroid }) {
    // asteroid is retrieved from neoData.map() in Home.jsx

    return (
        <div className="
            bg-white text-black 
            p-2
            mx-8 my-2
        "
            onClick={() => {}}
        >
            <h1>
                {asteroid.name}
            </h1>

            <p className="
            hidden md:block 
            ">
                Dist: {asteroid.distance}{asteroid.distanceUnit}
            </p>

            {asteroid.isHazardous ? 
            <>
                <img src="../src/icons/hazard_icon.png"></img>
                <div>yeah this is hazardous</div>
            </> 
                : 
            <div>no it's not hazardous</div>
        }
        </div>
    )
}