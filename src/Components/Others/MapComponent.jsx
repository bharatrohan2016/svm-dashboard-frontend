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
import { getPolygons } from '../../Service/api';
import { CircularProgress } from '@mui/material';

const MapComponent = () => {
  const [res, setRes] = useState();
  const [markerIcon] = useState(new L.Icon({
    iconUrl: '/marker.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  }));

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPolygons();
      console.log(result);
      setRes(result?.data);
    };

    fetchData();
  }, []);

  if ( typeof res === 'undefined') {
    return (
      <CircularProgress/>
    );
  }

  return (
    <>
      {res != undefined && res.length !== 0 ? (
        <MapContainer center={[25.745497300972563, 92.07992434501648]} zoom={12} style={{ height: '100%', width: '100%' }}>
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
            
            item.maps.map((map, index) =>(
              map.polygons[0] && map.polygons[0][0] && <Marker key={map._id} position={[map.polygons[0][0][0], map.polygons[0][0][1]]} icon={markerIcon}>
                <Popup>
                  <h6>Field Number: {index+1}</h6>
                  <h6>Farmer Name: <a href={`/#/farmer-profile/${item._id}`} target='_blank'>{item.farmerName}</a> </h6>
                  <h6>Crop Name: {map.crop_name}</h6>
                  <h6>Village Name: {item.village}</h6>
                  <h6>Area: {parseFloat(map.area).toFixed(2)} mt.sq</h6>
                </Popup>
              </Marker>
            ))
             
          ))}
        </MapContainer>
       
      ) : 'No records exist.'}
    </>
  );
};

export default MapComponent;
