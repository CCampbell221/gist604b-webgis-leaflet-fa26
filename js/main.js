
// Hawaiʻi Island WebGIS
// GIST 604B - Open Source GIS

// Initialize the Leaflet map
const map = L.map("map").setView([19.6, -155.5], 9);

// OpenStreetMap basemap
const basemap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
  }
).addTo(map);

// Scale bar
L.control.scale({
  imperial: true,
  metric: true
}).addTo(map);

// Create panes to control drawing order
map.createPane("censusPane");
map.getPane("censusPane").style.zIndex = 410;

map.createPane("roadsPane");
map.getPane("roadsPane").style.zIndex = 420;

map.createPane("schoolsPane");
map.getPane("schoolsPane").style.zIndex = 650;

// Layer groups for the layer control
const censusLayer = L.layerGroup().addTo(map);
const roadsLayer = L.layerGroup().addTo(map);
const schoolsLayer = L.layerGroup().addTo(map);

// Load census tracts
fetch("data/2020_Census_Tracts.geojson")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load census tracts");
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data, {
      pane: "censusPane",
      style: {
        color: "#243b53",
        weight: 1.5,
        opacity: 0.9,
        fillColor: "#6485a4",
        fillOpacity: 0.08
      },
      onEachFeature: function(feature, layer) {
        const properties = feature.properties || {};
        const tract = properties.NAME ||
                      properties.NAMELSAD ||
                      "Census Tract";

        layer.bindPopup(
          `<strong>${tract}</strong>`
        );
      }
    }).addTo(censusLayer);
  })
  .catch(error => console.error(error));

// Load Hawaiʻi County roads
fetch("data/Roads_-_Hawaii_County.geojson")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load roads");
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data, {
      pane: "roadsPane",
      style: {
        color: "#d94b35",
        weight: 1.2,
        opacity: 0.8
      },
      onEachFeature: function(feature, layer) {
        const properties = feature.properties || {};
        const name = properties.NAME ||
                     properties.FULLNAME ||
                     "Hawaiʻi County Road";

        layer.bindPopup(
          `<strong>${name}</strong>`
        );
      }
    }).addTo(roadsLayer);
  })
  .catch(error => console.error(error));

// Load Hawaiʻi public schools
fetch("data/Public_Schools.geojson")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load public schools");
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          pane: "schoolsPane",
          radius: 6,
          fillColor: "#e67e22",
          color: "#ffffff",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.9
        });
      },
      onEachFeature: function(feature, layer) {
        
const properties = feature.properties || {};

const name = properties.sch_name || "Public School";
const type = properties.sch_type || "Not available";
const code = properties.sch_code || "Not available";

layer.bindPopup(`
  <strong>${name}</strong><br>
  <strong>School Type:</strong> ${type}<br>
  <strong>School Code:</strong> ${code}
`);

      }
    }).addTo(schoolsLayer);
  })
  .catch(error => console.error(error));

// Interactive layer control
L.control.layers(
  {
    "OpenStreetMap": basemap
  },
  {
    "Public Schools": schoolsLayer,
    "Hawaiʻi County Roads": roadsLayer,
    "2020 Census Tracts": censusLayer
  },
  {
    collapsed: false,
    position: "topright"
  }
).addTo(map);
