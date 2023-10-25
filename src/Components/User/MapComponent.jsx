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
import { getFarmers, getMapsInfo } from '../../Service/api';

const MapComponent = () => {
  const [res, setRes] = useState();
  const [markerIcon] = useState(new L.Icon({
    iconUrl: '/marker.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  }));

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFarmers();
      setRes(result?.data);
    };

    fetchData();
  }, []);

  if ( typeof res === 'undefined') {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <>
      {res != undefined && res.length !== 0 ? (
        <MapContainer center={[res[0].lat, res[0].long]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="Street Map" >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite Map" checked>
              <TileLayer
                attribution='&copy; <a href="http://mapbox.com/copyright">Mapbox</a>'
                url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                subdomains={['mt1','mt2','mt3']}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {res.map((item) => (
            // Check if both lat and long are not null before rendering the Marker
            item.lat !== null && item.long !== null ? (
              <Marker key={item.id} position={[item.lat, item.long]} icon={markerIcon}>
                <Popup>
                  <h6>Field Number: {item.feildNumber}</h6>
                  <h6>Farmer Name: <a href={`/profile/${item._id}`} target='_blank'>{item.name}</a> </h6>
                  <h6>Village Name: {item.village}</h6>
                  <h6>Area: {item.area}</h6>
                </Popup>
              </Marker>
            ) : null // If either lat or long is null, don't render the Marker
          ))}
        </MapContainer>
       
      ) : 'No records exist.'}
    </>
  );
};

export default MapComponent;
