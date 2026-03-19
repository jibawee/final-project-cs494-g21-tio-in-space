import { NavLink, Outlet } from 'react-router'
import Particles from '../components/Particles'


export default function Root() {
    return (
        <div className="relative min-h-screen bg-black text-white">
            <div className="fixed inset-0 z-0">
                <Particles
                    particleColors={["#ffffff"]}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.03}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>

            <nav className="relative z-10 w-full bg-black bg-opacity-80 border-b-2 border-white">
                <ul className="flex items-center justify-between px-3 py-5 text-3xl">
                    
                    <li>
                        <NavLink to='/' className="flex items-center gap-2 text-white">
                            <img src="../src/icons/asteroid_icon.png" className="w-10 h-10" />
                            Asteroids Ahoy
                        </NavLink>
                    </li>

                    <div className="flex items-center gap-6">
                        <li>
                            <NavLink to='/watchlist' className="flex items-center">
                                <img src="../src/icons/watchlist_icon.png" className="w-10 h-10" />
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/forecast' className="flex items-center">
                                <img src="../src/icons/forecast_icon.png" className="w-10 h-10" />
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/settings' className="flex items-center">
                                <img src="../src/icons/settings_icon.png" className="w-10 h-10" />
                            </NavLink>
                        </li>
                    </div>

                </ul>
            </nav>

            <main className="relative z-10">
                <Outlet />
            </main>
        </div>
    )
}
