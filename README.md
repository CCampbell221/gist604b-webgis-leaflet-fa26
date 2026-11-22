
# Hawaiʻi Island WebGIS

**GIST 604B – Open Source GIS | University of Arizona | Fall 2026**

## Project Overview

This project is an interactive web mapping application developed using Leaflet, HTML, CSS, and JavaScript.

The application focuses on Hawaiʻi Island and visualizes public schools, transportation networks, and 2020 U.S. Census tracts.

## Technologies Used

- Leaflet.js
- HTML5
- CSS3
- JavaScript
- GeoJSON
- OpenStreetMap
- Node.js and npm
- Git and GitHub

## Datasets

### Public Schools
**File:** `data/Public_Schools.geojson`

Displays public schools as interactive point markers.

School popups provide:
- School name
- School type
- School code

### Hawaiʻi County Roads
**File:** `data/Roads_-_Hawaii_County.geojson`

Displays the road network across Hawaiʻi Island.

### 2020 Census Tracts
**File:** `data/2020_Census_Tracts.geojson`

Displays census tract boundaries for geographic reference.

## Interactive Map Features

- OpenStreetMap basemap
- Interactive zooming and panning
- Public school markers and information popups
- Hawaiʻi County road network
- 2020 census tract boundaries
- Layer visibility controls
- Scale bar displaying metric and imperial units

## Repository Structure

```text
gist604b-webgis-leaflet-fa26/
├── css/
│   └── style.css
├── data/
│   ├── 2020_Census_Tracts.geojson
│   ├── Public_Schools.geojson
│   └── Roads_-_Hawaii_County.geojson
├── js/
│   └── main.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Running the Application Locally

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open the integrated terminal.
4. Install dependencies:

   `npm install`

5. Start the development server:

   `npm start`

6. Open the application in your browser:

   `http://localhost:8080`

## Course Information

**Course:** GIST 604B – Open Source GIS

**Institution:** University of Arizona

**Semester:** Fall 2026

## Data and Map Attribution

Basemap: © OpenStreetMap contributors.

Thematic layers: Hawaiʻi GIS data resources and U.S. Census geographic data.
