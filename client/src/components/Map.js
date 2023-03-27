import "../App.css";
import axios from "axios";
import { Locate } from "./Search";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useState, useRef, useCallback, useContext, useEffect } from "react";
import Search from "./Search";
// import MapNav from "./MapNav";
import Navbar from "./Navbar";

import { Context } from "./Context";

import { FaMapMarkerAlt } from "react-icons/fa";
import "./Map.css";

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
  mapId: "11ca7f992f5b0841",
  disableDefaultUI: false,
  zoomControl: true,
}; //Google  maps options  variable

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

function Map() {
  const [selected, setSelected] = useState(null);

  const originRef = useRef();
  const destinationRef = useRef();
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [directionsPosition, setDirectionsPosition] = useState(null);
  const directionsRendererRef = useRef(null); // Add a reference to DirectionsRenderer
  const { state, dispatch } = useContext(Context);
  console.log("app state", state);

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: "DRIVING",
      waypoints: [],
      optimizeWaypoints: true,
      provideRouteAlternatives: true,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setInstructions(
      results.routes[0].legs[0].steps.map((step) => step.instructions)
    );
    setStartAddress(results.routes[0].legs[0].start_address);
    setEndAddress(results.routes[0].legs[0].end_address);

    console.log("route results", results);
    console.log("route steps", results.routes[0].legs[0].steps[0].instructions);
    console.log("startAdress", results.routes[0].legs[0].start_address);
    console.log("endAdress", results.routes[0].legs[0].end_address);
  }
  console.log("instructions", instructions);

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
      label: labels[labelIndex++ % labels.length],
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

  // const pinView = {
  //   url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  //   //labelOrigin: new window.google.maps.Point(15, -10),
  //   // scaledSize: new window.google.maps.Size(40, 40),client/src/files/people-support.png
  //   // origin: new window.google.maps.Point(0, 0),
  //   // anchor: new window.google.maps.Point(12, 12),
  // };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  // const onDirectionsRendererLoad = (directionsRenderer) => {
  //   directionsRendererRef.current = directionsRenderer; // Save the reference to the DirectionsRenderer
  // };

  const onMarkerDragEnd = async (e) => {
    if (directionsRendererRef.current) {
      const newCoords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setDirectionsPosition(newCoords);
      // Update the state variables
      setDirectionResponse(directionsRendererRef.current.getDirections());
      setEndAddress(directionsPosition.toString());
      setDistance(
        directionsRendererRef.current.getDirections().routes[0].legs[0].distance
          .text
      );
      setDuration(
        directionsRendererRef.current.getDirections().routes[0].legs[0].duration
          .text
      );
      setInstructions(
        directionsRendererRef.current
          .getDirections()
          .routes[0].legs[0].steps.map((step) => step.instructions)
      );
      // Do something with the newCoords (e.g. save to database)
    }
  };
  return (
    <div className="map-container">
<<<<<<<<< Temporary merge branch 1
   
=========
      <Navbar/>
>>>>>>>>> Temporary merge branch 2
      <div className="search-container">
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "space-between",
          }}
        >
          <h1>Helping-The-Hood</h1>
          <FaMapMarkerAlt className="log-icon" />
        </div>
        <div className="search">
          <Search
            panTo={panTo}
            center={center}
            originRef={originRef}
            destinationRef={destinationRef}
            calculateRoute={calculateRoute}
            setDistance={setDistance}
            setDuration={setDuration}
            setDirectionResponse={setDirectionResponse}
            distance={distance}
            duration={duration}
            directionResponse={directionResponse}
            instructions={instructions}
            setInstructions={setInstructions}
            startAddress={startAddress}
            endAddress={endAddress}
            onMarkerDragEnd={onMarkerDragEnd}
          />
        </div>
      </div>
      <div>
        <Locate panTo={panTo} />
      </div>

      <div className="map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
          // mapId="e3e570f7af62ed4d"
        >
          <div>
            <MarkerClusterer>
              {(clusterer) =>
                state.marker.map((marker) => (
                  <div>
                    <Marker
                      // draggable={true}
                      key={marker._id}
                      position={{
                        lat: marker.coordinates[1],
                        lng: marker.coordinates[0],
                      }}
                      icon={{
                        // pinView,
                        url: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/256/external-placeholder-location-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png",
                        scaledSize: new window.google.maps.Size(75, 75),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(37, 37),
                      }}
                      onClick={() => {
                        setSelected(marker);
                        console.log("selected marker", marker);
                      }}
                      clusterer={clusterer}
                      label={marker.label}
                    />
                    <Circle
                      center={{
                        lat: marker.coordinates[1],
                        lng: marker.coordinates[0],
                      }}
                      radius={1000}
                      options={{
                        fillColor: "#B3FFE5",
                        fillOpacity: 0.05,
                        strokeColor: "#3BB300",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                      }}
                    />
                    <Circle
                      center={{
                        lat: marker.coordinates[1],
                        lng: marker.coordinates[0],
                      }}
                      radius={2000}
                      options={{
                        fillColor: "#FFEA80",
                        fillOpacity: 0.05,
                        strokeColor: "#FFEA80",
                        strokeOpacity: 1,
                        strokeWeight: 4,
                      }}
                    />
                    <Circle
                      center={{
                        lat: marker.coordinates[1],
                        lng: marker.coordinates[0],
                      }}
                      radius={3000}
                      options={{
                        fillColor: "#FF8080",
                        fillOpacity: 0.05,
                        strokeColor: "#FF8080",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                      }}
                    />
                  </div>
                ))
              }
            </MarkerClusterer>
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
                      <h2>{selected.address} </h2>
                    </div>
                    <div>
                      <h3>{selected.label} </h3>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
            {directionResponse && (
              <div>
                <DirectionsRenderer
                  directions={directionResponse}
                  options={{
                    polylineOptions: {
                      zIndex: 50,
                      strokeColor: "#1976D2",
                      strokeWeight: 5,
                    },
                    draggable: true,
                  }}
                  onDragEnd={onMarkerDragEnd}
                  ref={directionsRendererRef}
                />
                <Circle
                  center={{
                    lat: directionResponse.lat,
                    lng: directionResponse.lng,
                  }}
                  radius={3000}
                  options={{
                    fillColor: "#FF8080",
                    fillOpacity: 0.4,
                    strokeColor: "#FF8080",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                  }}
                />
                ;
              </div>
            )}
          </div>
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
