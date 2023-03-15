import React from "react";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import "./ListTasks.css";
import { Context } from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import CalendarFunction from "./Calendar";
import { VscGitPullRequestCreate } from "react-icons/vsc";

function ListTasks() {
  const { state, dispatch } = useContext(Context);

  const [filter, setFilter] = useState({ task: "" });

  const handleApplyFilter = async () => {
    const response = await axios.post("/tasks/search", filter);
    console.log("(🇯🇲 handleApplyFilter listTasks", response);
    if (response.data.success) {
      dispatch({ type: "listTask", payload: response.data.task });
    }
  };

  const handleResetFilter = () => {
    setFilter({
      task: "",
    });

    async function fetchData() {
      try {
        const response = await axios.get("/tasks/list/");

        console.log(" 🇯🇲 taskList response", response);
        if (response.data.success) {
          dispatch({
            type: "listTask",
            payload: response.data.tasks,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCwMXMD2cIppB_Cwbuo0do4rJhVbKYiRUw",
  });
  const mapRef = useRef(); //Callback function to keep ref. of map position
  const [selected, setSelected] = useState(null);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); //Callback function to load map without rerender
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/tasks/list/");

        console.log(" 🇯🇲 taskList response", response);
        if (response.data.success) {
          dispatch({
            type: "listTask",
            payload: response.data.tasks,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    console.log("🇯🇲 handleDelete ~ id", id);
    const owner = state.user._id;

    if (!id || !owner === "") {
      console.log("Invalid data for task deletion");
      return;
    }

    try {
      const response = await axios.delete(`/tasks/delete/${id}`, {
        data: { owner, id },
      });
      console.log("🇯🇲 handleDelete ~ response", response);

      if (response.data.success) {
        dispatch({
          type: "removeTask",
          payload: id,
        });
      } else {
        if (response.data.errorId === 1) {
          alert("User not found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    mapId: "11ca7f992f5b0841",
    disableDefaultUI: false,
    zoomControl: true,
  }; //Google  maps options  variable

  console.log("state taskList", state.taskList);
  function sendEmail() {
    const userEmail = document.getElementById("user-email").value;
    const emailLink = "mailto:" + userEmail;
    window.open(emailLink);
  }

  return (
    <div>
      <div className="search-list">
        <input
          placeholder="Search task"
          type="text"
          id="base-input"
          onChange={(e) => setFilter({ ...filter, task: e.target.value })}
          value={filter.task}
          className="list-input"
        />
      </div>
      <div className="filter">
        <button
          type="button"
          onClick={handleApplyFilter}
          className="list-btn-1"
        >
          <FaFilter />
          Apply filter
        </button>
        <button
          type="button"
          onClick={handleResetFilter}
          className="list-btn-1"
        >
          <RiFilterOffFill />
          Reset filter
        </button>
      </div>

      <div className="list-form">
        {state.taskList &&
          state.taskList.map((item) => (
            <div key={item._id} list-input-div>
              <div className="list-main">
                <img
                  src={item.owner.image}
                  alt="helpee"
                  className="list-image"
                />
                <input
                  type="text"
                  name="place"
                  disabled
                  value={item.owner.firstName}
                  className="list-input-1"
                />
                <input
                  type="text"
                  name="place"
                  disabled
                  value={item.owner.email}
                  className="list-input-1"
                  id="user-email"
                />
                <div className="list-input-1">
                  <button
                    value={item.owner.email}
                    className="list-btn-1"
                    onClick={sendEmail}
                  >
                    Contact
                  </button>
                  <VscGitPullRequestCreate className="list-btn-2" />
                </div>
                <input
                  type="text"
                  name="place"
                  disabled
                  value={item.task}
                  className="list-input-1"
                />
                <p className="list-input-1">{item.taskDate}</p>
                <p className="list-input-1">{item.taskTime}</p>
                <p className="list-input-1">{item.taskDetails}</p>
                <p className="list-input-1">{item.location}</p>

                <GoogleMap
                  mapContainerStyle={{ height: "500px", width: "100%" }}
                  zoom={11}
                  center={center}
                  options={options}
                  onLoad={onMapLoad}
                  // mapId="e3e570f7af62ed4d"
                >
                  {state.taskList &&
                    state.taskList.map((item) => (
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
                              pixelOffset: new window.google.maps.Size(
                                -10,
                                -10
                              ),
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
                <div>
                  <Link to={"/edittasks/" + item._id}>
                    <button className="list-btn">edit</button>
                  </Link>
                  <button
                    className="list-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="calendar">
        <CalendarFunction
          // taskDate={item.taskDate}
          // taskTime={item.taskTime}
          tasks={state.taskList}
        />
      </div>
    </div>
  );
}

export default ListTasks;
