import { useNavigate } from "react-router";

export default function AsteroidItem({ asteroid }) {
    // asteroid is retrieved from neoData.map() in Home.jsx

    const navigate = useNavigate();

    return (
        <div className="
            flex
            bg-white text-black 
            px-2 py-5 mx-8 my-2
            hover:bg-gray-200 hover:cursor-pointer
        "
            onClick={() => navigate(`/asteroid/${asteroid.id}`)}
        >

            <h1 className="inline
            w-1/2
            font-bold text-xl
            ">
                {asteroid.name}
            </h1>

            <p className="
            hidden md:inline 
            w-1/2
            text-xl
            ">
                Dist: {asteroid.distance}{asteroid.distanceUnit}
            </p>


            {
                !asteroid.isHazardous && 
                <img className="inline w-6 h-6" src="../src/icons/hazard_icon.png"></img>
            }

        </div>
    )
}