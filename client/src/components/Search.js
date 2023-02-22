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
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { AiOutlineCompass } from "react-icons/ai";
import { Context } from "./Context";
import { useContext } from "react";

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
      <AiOutlineCompass className="icon" />
    </button>
  );
}
function Search({ panTo }) {
  const { state, dispatch } = useContext(Context);

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

  console.log("search state", state);
  return (
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
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter a place"
        style={{ border: "none", textAlign: "center" }}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default Search;
