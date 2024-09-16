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
    iconSize: [25, 25],
    iconAnchor: [15, 15]
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
                                url='http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
                                subdomains={['mt1','mt2','mt3']}
                            />
            </LayersControl.BaseLayer>
          </LayersControl>

          {res.map((item) => (
            // Check if both lat and long are not null before rendering the Marker
            
            item.maps.map((map, index) =>(
              map.polygons[0] && map.polygons[0][0] && <Marker key={map._id} position={[map.polygons[0][0][0], map.polygons[0][0][1]]} icon={markerIcon}>
                <Popup>
                  <p><u>Field Number:</u> <b>{index+1}</b></p>
                  <p><u>Farmer Name:</u> <b><a href={`/#/farmer-profile/${item._id}`} target='_blank'>{item.farmerName}</a></b> </p>
                  <p><u>Crop Name:</u> <b>{map.crop_name}</b></p>
                  <p><u>Village Name:</u> <b>{item.village}</b></p>
                  <p><u>Area:</u> <b>{(map.area/4046.86).toFixed(2)} Acres</b></p>
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
