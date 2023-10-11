import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
  const latitude = 51.505; // Replace with the desired latitude
  const longitude = -0.09; // Replace with the desired longitude
  const zoomLevel = 13; // Replace with the desired zoom level
  const markerLatitude = 51.505; // Replace with the marker's latitude
  const markerLongitude = -0.09;

  useEffect(() => {
    // Check if the map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Initialize the map if it doesn't already exist
    if (!mapContainer._leaflet_id) {
      const map = L.map('map').setView([latitude, longitude], zoomLevel);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Create a custom marker icon
      const customIcon = new L.Icon({
        iconUrl: '/marker.svg',
        iconSize: [24, 24], // Size of the icon (width, height)
        iconAnchor: [16, 32], // The point on the icon that corresponds to the marker's location
      });

      // Add a marker with the custom icon
      L.marker([markerLatitude, markerLongitude], { icon: customIcon }).addTo(map);
    }
  }, [latitude, longitude, zoomLevel, markerLatitude, markerLongitude]);

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  )
};

export default Map;
