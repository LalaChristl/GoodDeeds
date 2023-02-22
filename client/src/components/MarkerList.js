import { Context } from "./Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./markerlist.css";

import { MdDeleteForever } from "react-icons/md";
import { FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import ScrollButton from "./ScrollButton";

function MarkerList() {
  const { state, dispatch } = useContext(Context);
  const getData = async () => {
    const response = await axios.get("/markers/listmarker");

    console.log("🌞getData", response);

    if (response.data.success) {
      dispatch({
        type: "loadCoords",
        payload: response.data.marker,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async (id) => {
    const response = await axios.delete("/markers/deletemarker/" + id);
    console.log("🌞~ handleDelete Marker~ response", response);

    if (response.data.success)
      dispatch({
        type: "removeMarker",
        payload: id,
      });
  };

  const [filter, setFilter] = useState({
    address: "",
  });
  console.log("MarkerList state", state);

  const handleApplyFilter = async () => {
    const response = await axios.post("/markers/searchmarker", filter);
    console.log("🌞~ handleApplyFilter markerlist ~ response", response);

    if (response.data.success) {
      dispatch({
        type: "loadCoords",
        payload: response.data.marker,
      });
    }
  };
  const handleResetFilter = () => {
    setFilter({
      address: "",
    });

    getData();
  };
  return (
    <div>
      <div>{/* <Slider1 /> */}</div>
      <ScrollButton />
      <div>
        <div className="list-container-1">
          <input
            type="text"
            id="base-input"
            placeholder="Search marker"
            onChange={(e) => setFilter({ ...filter, address: e.target.value })}
            value={filter.address}
            className="f-list-input"
          />

          <button
            type="button"
            onClick={handleApplyFilter}
            className="form-list-btn"
          >
            <FaFilter />
            Apply filter
          </button>

          <button
            type="button"
            onClick={handleResetFilter}
            className="form-list-btn"
          >
            <RiFilterOffFill />
            Reset filter
          </button>
        </div>
        <h1>
          Map Memories <FaMapMarkerAlt className="map-icon" />
        </h1>
        {state.marker.map((item) => (
          <div key={item._id} className="m-list-container">
            <div className="m-list">
              <h2>{item.address}</h2>
              <p>Lat: {item.coordinates[1]}</p>
              <p>Lng: {item.coordinates[0]}</p>

              <div className="m-list-icons">
                <MdDeleteForever
                  className=" m-delete-btn "
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarkerList;
