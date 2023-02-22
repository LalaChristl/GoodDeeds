import "../App.css";
import axios from "axios";
import { Locate } from "./Search";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useRef, useCallback, useContext, useEffect } from "react";
import Search from "./Search";

import { Context } from "./Context";

import { FaMapMarkerAlt } from "react-icons/fa";

const libraries = ["places"]; //Google Places Libraries variable

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}; //Google  maps mapContainerStyle  variable

const center = {
  lat: 52.531677,
  lng: 13.381777,
}; //Google  maps mapContainerStyle  variable

const options = {
  styles: [
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
  ],
  // mapTypeId: "satellite",
  disableDefaultUI: false,
  zoomControl: true,
}; //Google  maps options  variable

function Map() {
  const [selected, setSelected] = useState(null);

  const { state, dispatch } = useContext(Context);
  console.log("app state", state);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/markers/listmarker");

      console.log("getData", response);

      if (response.data.success) {
        dispatch({
          type: "loadCoords",
          payload: response.data.marker,
        });
      }
    }
    getData();
  }, []);

  const onMapClick = async (e) => {
    // if (!state.user._id) {
    //   alert("You must log in to use the map feature");
    //   return;
    // }
    const response = await axios.post("/markers/addmarker", {
      address: state.address,
      lng: e.latLng.lng(),
      lat: e.latLng.lat(),
    });
    console.log("handleAddToMap ~ response", response);

    if (response.data.success) {
      dispatch({
        type: "addCoords",
        payload: response.data.marker,
      });
    }
  };

  const mapRef = useRef(); //Callback function to keep ref. of map position

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); //Callback function to load map without rerender

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);
  // console.log(process.env);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCwMXMD2cIppB_Cwbuo0do4rJhVbKYiRUw",
    libraries,
  }); // Loading function for Google maps

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div classNameName="App">
      <h1>
        Map Memories
        <FaMapMarkerAlt className="log-icon" />
      </h1>

      <div className="search">
        <Search panTo={panTo} />
      </div>
      <div>
        <Locate panTo={panTo} />
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <div>
          {state.marker.map((marker) => (
            <Marker
              // draggable={true}
              key={marker._id}
              position={{
                lat: marker.coordinates[1],
                lng: marker.coordinates[0],
              }}
              icon={{
                // url: "",
                scaledSize: new window.google.maps.Size(25, 25),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(12, 12),
              }}
              onClick={() => {
                setSelected(marker);
                console.log("selected marker", marker);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              options={{
                pixelOffset: new window.google.maps.Size(0, 0),
              }}
              position={{
                lat: selected.coordinates[1],
                lng: selected.coordinates[0],
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(to bottom, #B3FFE5 0%,#4DFFE1 50%,#4DFFE1 50%,#14DFFE 100%)",
                  width: "100%",
                  height: "10vh",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <h2>{selected.address} </h2>
              </div>
            </InfoWindow>
          ) : null}
        </div>
      </GoogleMap>
    </div>
  );
}

export default Map;
