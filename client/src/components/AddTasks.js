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
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Popover,
} from "@mui/material";

const libraries = ["places"];

function AddTasks() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { state, dispatch } = useContext(Context);
  const [taskData, setTaskData] = useState({
    task: [],
    taskDate: "",
    taskTime: "",
    location: "",
    taskDetails: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedTask, setClickedTask] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(baseUrl + `/tasks/list`, {
          withCredentials: true,
        });
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
  function MyButton({ onClick }) {
    return (
      <button onClick={onClick} className="task-btn" title="save">
        Save
      </button>
    );
  }

  console.log("state", state);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCwMXMD2cIppB_Cwbuo0do4rJhVbKYiRUw",
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const handlePlaceSelect = () => {
    const addressObject = autocompleteRef.current.getPlace();
    const latLng = {
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    };
    setTaskData({
      ...taskData,
      location: addressObject.formatted_address,
      lat: latLng.lat,
      lng: latLng.lng,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Set the anchorEl and clickedTask states to the event target
    setAnchorEl(e.target);
    setClickedTask(e.target);
    const data = {
      task: taskData.task,
      taskDate: taskData.taskDate,
      taskTime: taskData.taskTime,
      location: taskData.location,
      taskDetails: taskData.taskDetails,
      lat: taskData.lat,
      lng: taskData.lng,
      owner: state.user._id,
    };

    console.log("addTasks data", data);

    try {
      const response = await axios.post(baseUrl + "/tasks/add", data, {
        withCredentials: true,
      });

      console.log("🌞 AddTasks", response.data);

      if (response.data.success) {
        resetInput();
        // alert("Your request was added");
        setErrorMessage("Your request was added");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Please fill out the required fields");
    }
  };

  return (
    <div>
      <div className="border-2  gap-5 max-w-[full] mx-auto min-w-[375px] overflow-hidden items-center bg-[#fff3e9] text-[#110931] ">
        <Navbar />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            gap: 5,
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 5,
            paddingBottom: 20,
            background:
            "linear-gradient(90deg, rgba(255,232,210,1) 0%, rgba(196,252,240,1) 100%)",
            color: "black",
          }}
        >
          {/* <!-- Scroller Start --> */}
          <Typography>
            <div className="flex flex-col justify-center items-center ">
              <div className="login-scroller-container">
                <h1 className="login-h1">
                  Good Deeds
                  {/* <!-- Scroller Start --> */}
                  <div className="login-scroller">
                    <span>
                      Connect
                      <br />
                      Engage
                      <br />
                      Empower
                    </span>
                  </div>
                  {/* <!-- Scroller End --> */}
                </h1>
              </div>
            </div>
          </Typography>
          <div className="task-container">
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
                  value={taskData.taskDate}
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
                  value={taskData.taskTime}
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
                  value={taskData.taskDetails}
                  onChange={(e) =>
                    setTaskData({ ...taskData, taskDetails: e.target.value })
                  }
                  className="task-input"
                  title="description"
                ></textarea>
              </div>
              <div className="task-input-div">
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
                    value={taskData.location}
                    onChange={(e) =>
                      setTaskData({ ...taskData, location: e.target.value })
                    }
                    className="task-input"
                    title="location"
                  />
                </Autocomplete>
              </div>
              <MyButton onClick={handleFormSubmit} />
              <div className="task-input-div">
                <Link to="/listtasks/" title="tasklist">
                  <button className="task-btn">List</button>
                </Link>
              </div>
            </div>
          </div>
          {errorMessage && (
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
          )}
        </Box>
        <Footer2 />
      </div>
    </div>
  );
}

export default AddTasks;
