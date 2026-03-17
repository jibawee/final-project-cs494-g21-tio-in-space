import { NavLink, Outlet } from 'react-router'

export default function Root() {
    return (
        <div>
            <nav>
                {/* NavLinks here */}
            </nav>
            <main><Outlet /></main>
        </div>
    )
}
