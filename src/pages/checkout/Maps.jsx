import useStyles from './styles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Loader from "../../img/spinner.gif"
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useStateValue } from '../../context/StateProvider';
// import { getError } from '../utils/error';

import { useNavigate } from 'react-router-dom';


const defaultLocation = { lat: 45.516, lng: -73.56 };
// const defaultLocation = { lat: 5.6221, lng: 0.1734 };
const libs = ['places'];

function Map() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

 const [{user}, dispatch] = useStateValue();

 const navigate = useNavigate();


  const [googleApiKey, setGoogleApiKey] = useState(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      enqueueSnackbar('Geolocation is not supported by this browser', {
        variant: 'error',
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      dispatch({
        type: 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION',
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });
      enqueueSnackbar('location selected successfully', {
        variant: 'success',
      });
      navigate('/checkout-details')
    }
  };
  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  return googleApiKey ? (
    <div className={classes.fullContainer}>
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className={classes.mapInputBox}>
              <input type="text" placeholder="Enter your address"></input>
              <button type="button" className="primary" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <Loader />
  );
}

export default Map;