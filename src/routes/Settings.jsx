export default function Settings() {

    const unit_systems = ["imperial", "metric"]
    const themes = ["light", "dark"]

    return (
        <div>
            Settings

            <h1>Units</h1>
            <button onClick={() => {
                    window.localStorage.setItem("units", "imperial")
                    console.log("imperial")
                }} >Set to imperial</button>
            <button onClick={() => {
                    window.localStorage.setItem("units", "metric")
                    console.log("metric")
                }} >Set to metric</button>

            <h1>Theme</h1>
        </div>
    )
}
