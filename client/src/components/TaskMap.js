import React from "react";
import { useState, useRef, useCallback } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function TaskMap({ task }) {
  // Map load
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  // Map reference
  const mapRef = useRef(); //Callback function to keep ref. of map position

  // State to select Marker
  const [selected, setSelected] = useState(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); //Callback function to load map without rerender

  // Map load messages
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

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
    // mapId: "11ca7f992f5b0841",
    disableDefaultUI: false,
    zoomControl: true,
  }; //Google  maps options  variable

  return (
    <div style={{ width: "30rem" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "300px",
          width: "100%",
          border: "2px solid #ff8e25",
          borderRadius: "10px",
          boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.3)",
        }}
        zoom={11}
        center={center}
        options={options}
        onLoad={onMapLoad}
        className="map-container"
      >
        {task &&
          task.map((item) => (
            <div>
              <Marker
                key={item._id}
                position={{
                  lat: item.coordinates[1],
                  lng: item.coordinates[0],
                }}
                onClick={() => {
                  setSelected(item);
                  console.log("selected marker", item);
                }}
                icon={{
                  // pinView,
                  url: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/256/external-placeholder-location-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png",
                  scaledSize: new window.google.maps.Size(60, 60),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(37, 37),
                }}
              />

              {selected ? (
                <InfoWindow
                  options={{
                    pixelOffset: new window.google.maps.Size(-10, -10),
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
                    <div
                      style={{
                        width: "100%",
                        height: "10vh",
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "10vh",
                          textAlign: "center",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          padding: "5px",
                        }}
                      >
                        <h2>{selected.location} </h2>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              ) : null}
            </div>
          ))}
      </GoogleMap>
    </div>
  );
}

export default TaskMap;
