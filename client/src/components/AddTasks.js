import React from "react";
import { useState, useContext, useRef } from "react";
import "./AddTasks.css";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Context } from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";

const libraries = ["places"];

function AddTasks() {
  const { state } = useContext(Context);
  const [taskData, setTaskData] = useState({
    task: [],
    taskDate: "",
    taskTime: "",
    location: "",
    taskDetails: "",
  });
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
            >
              <option value="" className="option-input">
                Choose a task
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
          />
        </div>
        <div className="task-input-div">
          <input
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
            />
          </Autocomplete>
        </div>
        <div className="task-input-div">
          <Link to="/listtasks/">
            <button className="task-btn">List</button>
          </Link>
        </div>
      </div>
      <div className="task-form">
        <div className="task-input-div">
          <input
            type="text"
            name="task"
            disabled
            value={state.task.task}
            className="task-input-1"
          />
        </div>
        <div className="task-input-div">
          <input
            type="text"
            name="date"
            disabled
            value={state.task.taskDate}
            className="task-input-1"
          />
        </div>
        <div className="task-input-div">
          <input
            type="text"
            name="time"
            disabled
            value={state.task.taskTime}
            className="task-input-1"
          />
        </div>
        <div className="task-input-div">
          <input
            type="text"
            name="details"
            disabled
            value={state.task.taskDetails}
            className="task-input-1"
          />
        </div>
        <div className="task-input-div">
          <input
            type="text"
            name="place"
            disabled
            value={state.task.location}
            className="task-input-1"
          />
        </div>
      </div>
    </div>
  );
}

export default AddTasks;
