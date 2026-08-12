import { useNavigate } from "react-router";
import hazardIcon from "../src/icons/hazard_icon.png";

export default function AsteroidItem({ asteroid }) {
    // asteroid is retrieved from neoData.map() in Home.jsx

    const navigate = useNavigate();

    return (
        <div className="
            flex items-center
            bg-white text-black 
            px-2 py-5 mx-8 my-2
            pr-6
            hover:bg-gray-200 hover:cursor-pointer
        "
            onClick={() => navigate(`/asteroid/${asteroid.id}`)}
        >

            <h1 className="
            inline
            w-1/2
            ml-auto
            font-bold text-xl
            flex-grow
            text-left
            pl-4
            ">
                {asteroid.name}
            </h1>

            <p className="
            hidden md:inline 
            w-1/2
            pr-4
            text-right
            ">
                Dist: {asteroid.distance.toLocaleString('en-US', {maximumFractionDigits: 2})}{asteroid.distanceUnit}
            </p>


            {!asteroid.isHazardous ? (
                <div className="w-6 h-6" />  // placeholder keeps distance in same spot
            ) : (
                <img className="w-6 h-6" src={hazardIcon} />
            )}

        </div>
    )
}