import React, { useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  LayersControl,
  Circle,
  TileLayer,
  Marker,
  FeatureGroup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [markerIcon, setMarkerIcon] = useState(new L.Icon({
    iconUrl: '/marker.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  }));

  return (
    <MapContainer center={[51.51, -0.09]} zoom={8} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.51, -0.09]} icon={markerIcon} />
    </MapContainer>
  );
};

export default MapComponent;
