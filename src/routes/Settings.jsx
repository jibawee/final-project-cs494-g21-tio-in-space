export default function Settings() {

    return (
        <div className="grid gap-5 mx-20">

            <h1 className="text-4xl mt-5">Settings</h1>

            <div className="
                border-1 border-white
            ">
                <h1 className="settings-label">Modify Default Units</h1>

                <div className="flex gap-x-5 justify-evenly
                mx-8">
                    <button 
                        className="settings-btn"
                        onClick={() => {
                                window.localStorage.setItem("units", "imperial")
                                console.log("setted to imperial")
                            }} >Imperial
                    </button>
                    <button 
                        className="settings-btn"
                        onClick={() => {
                                window.localStorage.setItem("units", "metric")
                                console.log("setted to metric")
                            }} >Metric
                    </button>
                </div>
            </div>
{/* 
            <div className="border-1 border-white 
            ">
                <h1 className="settings-label"
                >Modify Theme</h1>

                <div className="flex gap-x-5 justify-evenly
                    mx-8">
                    <button 
                        className="settings-btn"
                        onClick={() => {
                                window.localStorage.setItem("theme", "light")
                                console.log("setted to light")
                            }} >Light
                    </button>
                    <button 
                        className="settings-btn"
                        onClick={() => {
                                window.localStorage.setItem("theme", "dark")
                                console.log("setted to dark")
                            }} >Dark
                    </button>
                </div>
            </div> */}
        </div>
    )
}
