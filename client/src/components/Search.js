import { useEffect, useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { AiOutlineCompass } from "react-icons/ai";
import { Context } from "./Context";
import { useContext } from "react";
import { BiReset } from "react-icons/bi";
import { TiLocationArrow } from "react-icons/ti";
import { MdNextPlan } from "react-icons/md";

export function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            // console.log("geolocation position", position);
          },
          () => null
        );
      }}
    >
      <AiOutlineCompass className="log-icon" />
    </button>
  );
}
function Search({
  panTo,
  center,
  originRef,
  destinationRef,
  setDirectionResponse,
  setDuration,
  setDistance,
  calculateRoute,
  distance,
  duration,
  instructions,
  setInstructions,
  startAddress,
  endAddress,
  onMarkerDragEnd,
}) {
  const { state, dispatch } = useContext(Context);

  const destinationMarkerRef = useRef(null);

  useEffect(() => {
    if (destinationMarkerRef.current) {
      // add event listener to the marker to listen for drag end events
      destinationMarkerRef.current.addListener("dragend", onMarkerDragEnd);
    }

    return () => {
      if (destinationMarkerRef.current) {
        // remove event listener when component unmounts
        destinationMarkerRef.current.removeListener("dragend", onMarkerDragEnd);
      }
    };
  }, [destinationMarkerRef, onMarkerDragEnd]);

  const resetState = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setValue("");
    setValue1("");
    setInstructions([]);
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 52.531677, lng: () => 13.381777 },
      radius: 200 * 1000,
    },
  });
  const {
    ready: ready1,
    value: value1,
    suggestions: { status: status1, data: data1 },
    setValue: setValue1,
    clearSuggestions: clearSuggestions1,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 52.531677, lng: () => 13.381777 },
      radius: 200 * 1000,
    },
  });

  console.log("search state", state);
  return (
    <div className="search-main">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
              console.log("Search results lat,lng", lat, lng);
              console.log("Search results address", address);
              dispatch({
                type: "address",
                payload: address,
              });
            } catch (error) {
              console.log("error");
            }
            console.log("suggestions address", address);
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ marginRight: "5px" }}>
              <ComboboxInput
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="Origin"
                style={{ border: "none", textAlign: "center" }}
                ref={originRef}
              />
            </div>
          </div>
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <Combobox
          onSelect={async (address) => {
            setValue1(address, false);
            clearSuggestions1();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });

              console.log("Search results lat,lng", lat, lng);
              console.log("Search results address1", address);
              dispatch({
                type: "address1",
                payload: address,
              });
            } catch (error) {
              console.log("error");
            }
            console.log("suggestions address1", address);
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ marginRight: "5px" }}>
              <ComboboxInput
                value={value1}
                onChange={(e) => {
                  setValue1(e.target.value);
                }}
                disabled={!ready1}
                placeholder="Destination"
                style={{ border: "none", textAlign: "center" }}
                ref={destinationRef}
              />
            </div>
          </div>
          <ComboboxPopover>
            <ComboboxList>
              {status1 === "OK" &&
                data1.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <div
        style={{
          width: "100%",

          padding: "5px",
          color: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            padding: "10px",
            color: "white",
          }}
        >
          <p
            style={{
              width: "100%",
              display: "flex",
              textAlign: "center",

              fontWeight: "bolder",
            }}
            title="distance"
          >
            Distance: {distance}
          </p>
          <p
            style={{
              width: "100%",
              display: "flex",
              textAlign: "center",
              marginLeft: "2.5rem",
              fontWeight: "bolder",
            }}
            title="duration"
          >
            Duration: {duration}
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              background: "red",
              padding: "4px",
              borderRadius: "5px",
              fontWeight: "bolder",
            }}
            onClick={() => panTo(center)}
            title="center"
          >
            <TiLocationArrow
              style={{ fontSize: "1.5rem", color: "white" }}
              title="route"
              onClick={calculateRoute}
            />
          </button>
          <button
            style={{
              background: "red",
              padding: "4px",
              borderRadius: "5px",
              fontWeight: "bolder",
              marginLeft: "2rem",
            }}
          >
            <BiReset
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "white",
              }}
              title="reset"
              onClick={resetState}
            />
          </button>
        </div>
      </div>
      {instructions.length > 0 && (
        <div style={{ fontSize: "1rem", cursor: "pointer", color: "white" }}>
          <div
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            <h2>Start:</h2>
            <p>{startAddress}</p>
          </div>
          <ul>
            {instructions.map((instruction, index) => (
              <li key={index} style={{ padding: "5px" }}>
                {
                  new DOMParser().parseFromString(instruction, "text/html").body
                    .innerText
                }
                <span style={{ color: "red", fontSize: "0.5rem" }}>
                  <MdNextPlan />
                </span>
              </li>
            ))}
          </ul>
          <div
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            <h2>End:</h2>
            <p>{endAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
