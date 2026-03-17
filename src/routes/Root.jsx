import { NavLink, Outlet } from 'react-router'

export default function Root() {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/">Asteroids Ahoy</NavLink></li>
                    <li><NavLink to="/watchlist">Watchlist</NavLink></li>
                    <li><NavLink to="/forecast">Forecast</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
            </nav>
            <main><Outlet /></main>
        </div>
    )
}
