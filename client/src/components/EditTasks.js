import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import "./EditTasks.css";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Context } from "./Context";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";
import { Popover, MenuItem, Menu, Typography } from "@mui/material"; // import Popover and other MUI components

const libraries = ["places"];

function EditTasks() {
  // ID for the task to edit
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedTask, setClickedTask] = useState(null);

  // useNavigate hook
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const [taskToEdit, setTaskToEdit] = useState({
    task: [],
    taskDate: "",
    taskTime: "",
    location: "",
    taskDetails: "",
  });
  console.log("state", state);
  const autocompleteRef = useRef(null);

  function MyButton({ onClick }) {
    return (
      <button onClick={onClick} className="edit-task-btn" title="save">
        Save
      </button>
    );
  }

  useEffect(() => {
    console.log("id useeffect", id);
    async function getData() {
      const response = await axios.get("/tasks/findone/" + id);
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

  const handleEditTask = async (e) => {
    e.preventDefault();
    // Set the anchorEl and clickedTask states to the event target
    setAnchorEl(e.target);
    setClickedTask(e.target);

    if (
      !id ||
      !taskToEdit.task ||
      !taskToEdit.taskDate ||
      !taskToEdit.taskTime ||
      !taskToEdit.taskDetails ||
      !taskToEdit.location === ""
    ) {
      console.log(alert, "Invalid data for task deletion");
      return;
    }
    const addressObject = autocompleteRef.current.getPlace();
    const latLng = {
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    };

    const data = {
      userID: state.user._id,
      task: taskToEdit.task,
      taskDate: taskToEdit.taskDate,
      taskTime: taskToEdit.taskTime,
      location: taskToEdit.location,
      taskDetails: taskToEdit.taskDetails,
      lat: latLng.lat,
      lng: latLng.lng,
      owner: taskToEdit.owner, // Use the owner ID of the task
      _id: id,
    };

    // Check if user is authorized to edit the task
    console.log("tasktoedit owner", data.owner);
    if (state.user._id !== data.owner) {
      console.log("Unauthorized");
      setErrorMessage("Unauthorized!!");
      return;
    }
    console.log("addTasks data", data);
    try {
      const response = await axios.put("/tasks/edit", data);

      console.log("🌞 EditTasks", response.data); // log the response from the server
      if (response.data.success) navigate("/listtasks");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.request.statusText);
    }
  };

  const handlePlaceSelect = async () => {
    const addressObject = autocompleteRef.current.getPlace();
    const latLng = {
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    };

    handleEditTask();
  };

  return (
    <div className="border-2  gap-5 max-w-[1280px] mx-auto min-w-[375px] overflow-hidden items-center bg-[#fff3e9] text-[#110931] ">
      <div
        style={{ backgroundColor: "#fff3e9", width: "100vw", height: "100vh" }}
      >
        <Navbar />
        {/* <!-- Scroller Start --> */}
        <div className="add-task-scroller">
          <span>
            Connect
            <br />
            Engage
            <br />
            Empower
          </span>
        </div>
        {/* <!-- Scroller End --> */}
        <div className="edit-task-container">
          <div className="edit-task-form">
            <div className="edit-task-input-div">
              {
                <select
                  name="tasks"
                  value={taskToEdit.task}
                  onChange={(e) =>
                    setTaskToEdit({ ...taskToEdit, task: e.target.value })
                  }
                  className="edit-select"
                  multiple={false}
                  title="request"
                >
                  <option value="" className="edit-option-input">
                    Choose a task
                  </option>
                  <option value="shopping" className="edit-option-input">
                    Shopping
                  </option>
                  <option value="transport" className="edit-option-input">
                    Transport
                  </option>
                  <option value="house-keeping" className="edit-option-input">
                    House-Keeping
                  </option>
                </select>
              }
            </div>
            <div className="edit-task-input-div" title="date">
              <input
                type="date"
                name="date"
                value={taskToEdit.taskDate}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, taskDate: e.target.value })
                }
                placeholder="date"
                className="edit-task-input"
              />
            </div>
            <div className="edit-task-input-div" title="time">
              <input
                type="time"
                name="time"
                value={taskToEdit.taskTime}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, taskTime: e.target.value })
                }
                placeholder="time"
                className="edit-task-input"
              />
            </div>
            <div className="edit-task-input-div" title="details">
              <textarea
                placeholder="description"
                type="text"
                name="description"
                value={taskToEdit.taskDetails}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, taskDetails: e.target.value })
                }
                className="edit-task-input"
              ></textarea>
            </div>
            <div className="edit-task-input-div" title="location">
              <Autocomplete
                onLoad={(autocomplete) =>
                  (autocompleteRef.current = autocomplete)
                }
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
                  className="edit-task-input"
                />
              </Autocomplete>
              <MyButton onClick={handleEditTask} />
            </div>
            {/* {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )} */}
          </div>
          <Popover
            open={Boolean(clickedTask)}
            anchorEl={anchorEl}
            onClose={() => setClickedTask(null)}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 100, left: 400 }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div style={{ padding: "20px" }}>{errorMessage}</div>
          </Popover>
        </div>
        <Footer2 />
      </div>
    </div>
  );
}

export default EditTasks;
