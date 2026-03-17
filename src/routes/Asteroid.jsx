export default function Asteroid() {

    //if Asteroid.not hazardous
    const hazardous = false

    return (
        <div>
            Asteroid
            <p>
                Name: {/* Get Asteroid.name */}
            </p>

            <p>
                {hazardous ? "Hazardous" : "Not Hazardous"}
            </p>

            <p>
                Magnitude: {/**Asteroid.magnitude */}
            </p>

            <p>
                Diameter: {/**Asteroid.diameter */}
            </p>

            <br></br>

            <p>
                Orbit Class: {/**Asteroid.classe */}
            </p>

            <p>
                Orbital Period: {/**Asteroid.period */}
            </p>

            <p>
                Orbit Perihelion: {/**Asteroid.peri */}
            </p>

            <p>
                Orbit Aphelion: {/**Asteroid.aph */}
            </p>

            <br></br>

            <p>
                First Observed: {/**Asteroid.first_obs */}
            </p>

            <p>
                Last Observed: {/**Asteroid.last_obs */}
            </p>
            
        </div>
    )
}
