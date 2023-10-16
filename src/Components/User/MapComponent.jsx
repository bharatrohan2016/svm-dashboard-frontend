import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  LayersControl,
  Circle,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getMapsInfo } from '../../Service/api';

const MapComponent = () => {
  const [res, setRes] = useState();
  const [markerIcon] = useState(new L.Icon({
    iconUrl: '/marker.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  }));

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMapsInfo();
      setRes(result?.data);
    };

    fetchData();
  }, []);

  if (!res) {
    return <div>Loading...</div>;
  }

  console.log(res[0]);

  return (
    <MapContainer center={[res[0].lat, res[0].long]} zoom={13} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {res.map((item) => (
        <Marker key={item.id} position={[item.lat, item.long]} icon={markerIcon}>
          <Popup>{item.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
