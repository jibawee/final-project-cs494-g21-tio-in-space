import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import Root from './routes/Root'
import Home, { homeLoader } from './routes/Home'
import Asteroid from './routes/Asteroid'
import Forecast from './routes/Forecast'
import Watchlist from './routes/Watchlist'
import Settings from './routes/Settings'

//import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { 
              index: true,
              Component: Home,
              loader: homeLoader
            },
            { 
              path: "asteroid",
              Component: Asteroid,
              children: [
                {
                  path: ":id",
                  Component: Asteroid
                }
              ]
            },
            { 
              path: "forecast",
              Component: Forecast
            },
            { 
              path: "watchlist",
              Component: Watchlist
            },
            { 
              path: "settings",
              Component: Settings
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)