console.log("Tectonic Plates and Earthquakes Map Loaded");

let terrain = L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    attribution: 'Tiles &copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
  });

let streets = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors'
  });

let myMap = L.map('map', {
  center: [37.09, -95.71],
  zoom: 4,
  layers: [terrain]
});

let tectonicPlates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let baseMaps = {
  "Topographic Map": terrain,
  "Street Map": streets
};

let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {

  function markerStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getDepthColor(feature.geometry.coordinates[2]),
      color: '#000',
      radius: setRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function getDepthColor(depth) {
    return depth > 90 ? '#d73027' :
           depth > 70 ? '#fc8d59' :
           depth > 50 ? '#fee08b' :
           depth > 30 ? '#d9ef8b' :
           depth > 10 ? '#91cf60' :
                        '#1a9850';
  }

  function setRadius(magnitude) {
    return magnitude ? magnitude * 5 : 2;
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: markerStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        `<h4>${feature.properties.place}</h4>
         <hr>
         <p><strong>Magnitude:</strong> ${feature.properties.mag}<br>
         <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>`
      );
    }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap);

  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90],
        colors = ['#1a9850', '#91cf60', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027'];

    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        `<i style="background:${colors[i]}"></i> ${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] : '+'}<br>`;
    }

    return div;
  };

  legend.addTo(myMap);

});

d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json').then(function(data) {
  L.geoJson(data, {
    color: 'orange',
    weight: 2
  }).addTo(tectonicPlates);

  tectonicPlates.addTo(myMap);
});
