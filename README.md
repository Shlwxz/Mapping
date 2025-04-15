# 🌍 Earthquake Data Visualization with Leaflet

This project visualizes recent earthquake data using [Leaflet.js](https://leafletjs.com/) and [D3.js](https://d3js.org/). The data comes from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

## 📌 Key Features

- Real-time earthquake data plotted by coordinates
- Marker size corresponds to magnitude
- Marker color corresponds to earthquake depth
- Interactive popups show:
  - Location
  - Magnitude
  - Depth
- Custom legend for depth interpretation

## 🔧 Technologies

- HTML, CSS, JavaScript
- Leaflet
- D3
- GeoJSON API

## 🔗 Data Source

- [All earthquakes in the past 7 days (USGS)](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

## 🧠 How It Works

- D3 pulls GeoJSON data
- Leaflet maps data using circles
- Depth is mapped to a color scale
- Magnitude affects marker size
- A legend and tooltips explain data at a glance
