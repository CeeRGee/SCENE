// Set up the map
const map = L.map('map').setView([37.9601, -122.3456], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// Distance function
function getDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const userLat = 37.9600;
const userLon = -122.3458;
const proximityThreshold = 200;

// Loader Function Helper
function loadGeoJSON(url, options) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, options).addTo(map);
    });
}

// Load ALPR cameras
loadGeoJSON('alpr-locations.geojson', {
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
    if (props.installed) popup += `<br>Installed: ${props.installed}`;
    if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
    if (props.cost) popup += `<br>Cost: ${props.cost}`;
    layer.bindPopup(popup);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: "#ff0000", // Red
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
});

// Load fiber lines
loadGeoJSON('fiber-lines.geojson', {
  style: {
    color: "#800080", // Purple
    weight: 3,
    opacity: 0.9
  },
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Description: ${props.description}`;
    if (props.note) popup += `<br>Note: ${props.note}`;
    layer.bindPopup(popup);
  }
});

// Load ShotSpotter (SoundThinking)
loadGeoJSON('shotspotter-locations.geojson', {
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
    if (props.installed) popup += `<br>Installed: ${props.installed}`;
    if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
    if (props.cost) popup += `<br>Cost: ${props.cost}`;
    layer.bindPopup(popup);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: "#ffa500", // Orange
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
});

// Load general surveillance cameras
loadGeoJSON('camera-locations.geojson', {
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
    if (props.installed) popup += `<br>Installed: ${props.installed}`;
    if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
    if (props.cost) popup += `<br>Cost: ${props.cost}`;
    layer.bindPopup(popup);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: "#000000", // Black
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
});

// Load extracted ACLU cameras
loadGeoJSON('extracted-cameras.geojson', {
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
    if (props.installed) popup += `<br>Installed: ${props.installed}`;
    if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
    if (props.cost) popup += `<br>Cost: ${props.cost}`;
    layer.bindPopup(popup);
  },
  pointToLayer: function (feature, latlng) {
    const color = props.type && props.type.includes("ALPR") ? "#ff0000" : "#ffff00"; // Red or Yellow
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: color,
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
});

// Load Streetlight Cameras
loadGeoJSON('streetlight-cameras.geojson', {
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
    if (props.installed) popup += `<br>Installed: ${props.installed}`;
    if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
    layer.bindPopup(popup);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: "#00CED1", // Turquoise
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
});

// Load Mobile Surveillance Units
loadGeoJSON('mobile-units.geojson', {
  onEachFeature: function (feature, layer) {
    const props = feature.properties;
    let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
    if (props.installed) popup += `<br>Installed: ${props.installed}`;
    if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
    if (props.note) popup += `<br>Note: ${props.note}`;
    if (props.status) popup += `<br>Status: ${props.status}`;
    layer.bindPopup(popup);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: "#ff69b4", // Hot Pink 💗
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.85
    });
  }
});
// Load Microphone Detection Arrays
fetch('mic-arrays.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        let popup = `<strong>${props.name}</strong><br>Type: ${props.type}`;
        if (props.installed) popup += `<br>Installed: ${props.installed}`;
        if (props.vendor) popup += `<br>Vendor: ${props.vendor}`;
        if (props.note) popup += `<br>Note: ${props.note}`;
        layer.bindPopup(popup);
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#8B008B", // Dark magenta for audio arrays
          color: "#fff",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.85
        });
      }
    }).addTo(map);
  });

    
  