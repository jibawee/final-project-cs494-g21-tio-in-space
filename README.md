CS 494 W26
Final Project Proposal
Prof. Rob Hess
2/27/2026

Ian McKee (934-424-206)
Owen Jones (934-431-124)
Tea Kidder (934-462-487)

# High Level Description

Our final project is a React webpage with Tailwind design (query and state management methods like TanStack or Redux TBD) with call to NASA's API for NeoWs (Near Earth Object Web Service)

The web page by default displays today's nearest asteroids.

The user can view each asteroid on its individual page and get its info.

The user can select a day to a week range of all asteroids present at that time, and their info including danger level to Earth.

The user can also star any asteroid and can view their favorite asteroids in a watch list.

The user can also modify the format of units (e.g. km to mi) and the theme of the site.

# API Link

<https://api.nasa.gov/>

We will use <https://api.nasa.gov/neo/rest/v1/> to query for near-earth objects:

- GET /feed?start_date={start_date}&end_date={end_date}&api_key={key} - All nearby objects between start and end dates (7 day limit)
  - Usage: Populate home, forecast, and hazard pages with relevant data. Date range from user input
- GET /neo/{id}?api_key={key} - Lookup a specific Asteroid based on its id
  - Usage: Populate asteroid page with detailed data

# UI organization description

The app with have 5 pages

- / - Home
  - Shows today's nearby asteroids in a list
    - The user can click each list item to enter the asteroid detail page
- /asteroid/:id - Asteroid detail page
  - Detailed asteroid data like name, diameter, if its hazardous, orbit perihelion (closest distance), orbit aphelion (furthest distance), first observed, last observed
  - Option to "star" asteroid to add to watchlist (in localstorage)
- /forecast/:day - Weekly forecast
  - Defaults to Sunday - Saturday of the current week
  - User input of day, first day of forecast week
  - Displays all asteroids from that range in a list
    - The user can click each list item to enter the asteroid detail page
  - Generic stats: number of approaches, average size, hazardous ratio, etc.
- /watchlist - Watchlist
  - Displays all of the asteroids the user stars (adds) to their watchlist
    - The user can click each list item to enter the asteroid detail page
  - User option to remove asteroid from watchlist
- /settings - Settings page
  - Allows user to change unit format and theme

# Visual Prototypes

[Figma Prototype](https://www.figma.com/design/e5kdwDSZDa0pYCz2hPubD0/Advanced-Web-Dev?)

# Division of Labor statement

Active and yet undivided:
- (not started) Watchlist
- (not started) Date range

Ian will:

- (near done) Build Tailwind structure and add relevant responsive styling (Tea will perfect the design)
    - (in progress) asteroid item among others need responsive styling
- (might deprecate) Add on to API calls if needed
- (might deprecate) If needed, Redux watchlist (reassess after Assignment 4 is due)

Tea will

- Design/Styling
  - (done) Figma for UI planning
  - (in progress) Perfect the Tailwind for CSS implementation based on Figma / Add open source animations

Owen will

- (near done) Map API calls to our needed data from them and map
- (in progress) Manage local storage

## This is base react, vite, and react compiler (I got rid of a lot of files)

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
