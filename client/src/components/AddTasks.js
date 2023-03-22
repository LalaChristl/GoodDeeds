import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import "./AddTasks.css";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Context } from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";

const libraries = ["places"];

function AddTasks() {
  const { state, dispatch } = useContext(Context);
  const [taskData, setTaskData] = useState({
    task: [],
    taskDate: "",
    taskTime: "",
    location: "",
    taskDetails: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/tasks/list`);
        console.log("🇯🇲~ getData ~ response", response);

        if (response.data.success) {
          dispatch({
            type: "addTask",
            payload: response.data.tasks,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  const resetInput = () => {
    setTaskData({
      task: [],
      taskDate: "",
      taskTime: "",
      location: "",
      taskDetails: "",
    });
  };

  console.log("state", state);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCwMXMD2cIppB_Cwbuo0do4rJhVbKYiRUw",
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const handlePlaceSelect = async () => {
    const addressObject = autocompleteRef.current.getPlace();
    const latLng = {
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    };

    const data = {
      task: taskData.task,
      taskDate: taskData.taskDate,
      taskTime: taskData.taskTime,
      location: taskData.location,
      taskDetails: taskData.taskDetails,
      lat: latLng.lat,
      lng: latLng.lng,
      owner: state.user._id,
    };
    console.log("addTasks data", data);
    try {
      const response = await axios.post("/tasks/add", data);

      console.log("🌞 AddTasks", response.data); // log the response from the server
      if (response.data.success) {
        resetInput(); // reset the input after successful response
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task-container">
      <Navbar />
      <div className="search-list-1">
        <Link
          to="/dashboard/helpeeprofile/getuser2/:id"
          className="list-link"
          title="back to dashboard"
        >
          <button className="dash-btn">Dashboard</button>
        </Link>
      </div>
      <div className="task-form">
        <div className="task-input-div">
          {
            <select
              name="tasks"
              value={taskData.task}
              onChange={(e) =>
                setTaskData({ ...taskData, task: e.target.value })
              }
              className="select"
              multiple={false}
              title="task"
            >
              <option value="" className="option-input">
                Request
              </option>
              <option value="shopping" className="option-input">
                Shopping
              </option>
              <option value="transport" className="option-input">
                Transport
              </option>
              <option value="house-keeping" className="option-input">
                House-Keeping
              </option>
            </select>
          }
        </div>
        <div className="task-input-div">
          <input
            type="date"
            name="date"
            value={taskData.date}
            onChange={(e) =>
              setTaskData({ ...taskData, taskDate: e.target.value })
            }
            placeholder="date"
            className="task-input"
            title="date"
          />
        </div>
        <div className="task-input-div">
          <input
            title="time"
            type="time"
            name="time"
            value={taskData.time}
            onChange={(e) =>
              setTaskData({ ...taskData, taskTime: e.target.value })
            }
            placeholder="time"
            className="task-input"
          />
        </div>
        <div className="task-input-div">
          <textarea
            placeholder="description"
            type="text"
            name="description"
            value={taskData.details}
            onChange={(e) =>
              setTaskData({ ...taskData, taskDetails: e.target.value })
            }
            className="task-input"
            title="description"
          ></textarea>
        </div>
        <div className="task-input-div">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              placeholder="Enter a location"
              type="text"
              name="location"
              value={taskData.location}
              onChange={(e) =>
                setTaskData({ ...taskData, location: e.target.value })
              }
              className="task-input"
              title="location"
            />
          </Autocomplete>
        </div>
        <div className="task-input-div">
          <Link to="/listtasks/" title="tasklist">
            <button className="task-btn">List</button>
          </Link>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default AddTasks;
