import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import "./AddTasks.css";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Context } from "./Context";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const libraries = ["places"];

function EditTasks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const [taskToEdit, setTaskToEdit] = useState({
    task: [],
    taskDate: "",
    taskTime: "",
    location: "",
    taskDetails: "",
  });
  console.log("state", state);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    console.log("id useeffect", id);
    async function getData() {
      const response = await axios.get("/tasks/edit/" + id);
      console.log(" ~ getData ~ response", response);

      if (response.data.success) setTaskToEdit(response.data.task);
    }

    getData();
  }, [id]);

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
      task: taskToEdit.task,
      taskDate: taskToEdit.taskDate,
      taskTime: taskToEdit.taskTime,
      location: taskToEdit.location,
      taskDetails: taskToEdit.taskDetails,
      lat: latLng.lat,
      lng: latLng.lng,
      owner: state.user._id,
      _id: id,
    };
    console.log("addTasks data", data);
    try {
      const response = await axios.put("/tasks/edit", data);

      console.log("🌞 EditTasks", response.data); // log the response from the server
      if (response.data.success) navigate("/listtasks");
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
              value={taskToEdit.task}
              onChange={(e) =>
                setTaskToEdit({ ...taskToEdit, task: e.target.value })
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
            value={taskToEdit.taskDate}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, taskDate: e.target.value })
            }
            placeholder="date"
            className="task-input"
          />
        </div>
        <div className="task-input-div">
          <input
            type="time"
            name="time"
            value={taskToEdit.taskTime}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, taskTime: e.target.value })
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
            value={taskToEdit.taskDetails}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, taskDetails: e.target.value })
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
              value={taskToEdit.location}
              onChange={(e) =>
                setTaskToEdit({ ...taskToEdit, location: e.target.value })
              }
              className="task-input"
            />
          </Autocomplete>
        </div>
      </div>
    </div>
  );
}

export default EditTasks;
