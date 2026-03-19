import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import Root from './routes/Root'
import Home, { homeLoader } from './routes/Home'
import Asteroid, { asteroidLoader } from './routes/Asteroid'
import Forecast, { forecastLoader } from './routes/Forecast'
import Watchlist, { watchlistLoader } from './routes/Watchlist'
import Settings from './routes/Settings'

import './index.css'

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
              loader: asteroidLoader,
              children: [
                {
                  path: ":id",
                  Component: Asteroid
                }
              ]
            },
            { 
              path: "forecast",
              loader: forecastLoader  
            },
            { 
              path: "forecast/:start",
              Component: Forecast,
              loader: forecastLoader
            },
            { 
              path: "watchlist",
              Component: Watchlist,
              loader: watchlistLoader
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