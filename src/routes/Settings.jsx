import { useState } from "react"

export default function Settings() {

    let units = window.localStorage.getItem("units") ?? "metric"
    const [ unitSelected, setUnitSelected ] = useState(units)

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
                        className={"settings-btn" + (unitSelected == "metric" ? "" : " bg-white text-black")}
                        onClick={() => {
                                window.localStorage.setItem("units", "imperial")
                                setUnitSelected("imperial")
                            }} >Imperial
                    </button>
                    <button 
                        className={"settings-btn" + (unitSelected == "metric" ? " bg-white text-black" : "")}
                        onClick={() => {
                                window.localStorage.setItem("units", "metric")
                                setUnitSelected("metric")
                            }} >Metric
                    </button>
                </div>
            </div>
        </div>
    )
}
