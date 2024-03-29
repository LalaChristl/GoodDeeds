import React from "react";
import { useContext, useEffect, useState, useCallback } from "react";
import "./ListTasks.css";
import { Context } from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";

import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { GiSelect } from "react-icons/gi";
import Navbar from "./Navbar";
import { FaHandsHelping } from "react-icons/fa";
import Footer2 from "./Footer2";
import { Popover, MenuItem, Menu, Typography } from "@mui/material"; // import Popover and other MUI components

import { Box , Paper} from "@mui/material";

function ListTasks() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Global Context
  const { state, dispatch } = useContext(Context);
  // State to set task locally
  // const [task, setTask] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedTask, setClickedTask] = useState(null);

  // State for searching/filtering
  const [filter, setFilter] = useState({ task: "" });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const clickedItemId = localStorage.getItem("clickedItemId");
    if (clickedItemId) {
      setClicked(clickedItemId);
    }
  }, []);
  const [acceptedTasks, setAcceptedTasks] = useState([]);

  useEffect(() => {
    const storedAcceptedTasks =
      JSON.parse(localStorage.getItem("acceptedTasks")) || [];
    setAcceptedTasks(storedAcceptedTasks);
  }, []);

  // Api to server
  const handleApplyFilter = async () => {
    const response = await axios.post(baseUrl + "/tasks/search", filter, {
      withCredentials: true,
    });
    console.log("(🇯🇲 handleApplyFilter listTasks", response);
    if (response.data.success) {
      dispatch({ type: "listTask", payload: response.data.task });
    } else {
      setErrorMessage(response.data.message);
    }
  };
  // Reset function fo search
  const handleResetFilter = () => {
    setFilter({
      task: "",
    });
    // Funtion to fetch the tasks after filtering
    async function fetchData() {
      try {
        const response = await axios.get(baseUrl + "/tasks/list/", {
          withCredentials: true,
        });

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
  // function to display tasks
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(baseUrl + "/tasks/list/", {
          withCredentials: true,
        });

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
  const handleDelete = async (item) => {
    const owner = item.owner._id;
    const id = item._id;
    const userID = state.user._id;
    // if (!event) {
    //   console.log("Event is undefined");
    //   return;
    // }
    // Set the anchorEl and clickedTask states to the event target
    setAnchorEl(item);
    setClickedTask(item);
    console.log("🇯🇲 handleDelete ~ id, owner", id, owner);

    if (!id || !owner === "") {
      console.log("Invalid data for task deletion");
      return;
    }

    try {
      const response = await axios.delete(
        baseUrl + `/tasks/delete/${id}`,
        {
          data: { owner, id, userID },
        },
        {
          withCredentials: true,
        }
      );
      console.log("🇯🇲 handleDelete ~ response", response);

      if (response.data.success) {
        dispatch({
          type: "removeTask",
          payload: id,
        });
        handleDeleteLocally(id); // call the handleDeleteLocally function here
        setErrorMessage("Your task was deleted successfully");
      } else {
        if (response.data.errorId === 1) {
          alert("User not found");
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.request.statusText);
    }
  };

  // Function t accept task
  const handleAdd = async (item) => {
    if (!state.user._id) {
      alert("You must log in first");
      return;
    }
    setAnchorEl(item);
    setClickedTask(item);
    const response = await axios.post(
      baseUrl + "/users/taskconfirm",
      {
        _id: state.user._id,
        task: item,
      },
      {
        withCredentials: true,
      }
    );
    console.log("🚀 ~ handleAdd ~ response", response);

    if (response.data.success)
      dispatch({
        type: "taskConfirm",
        payload: response.data.task,
      });
    // alert("Task has been accepted successfully!"); // display success message
    setErrorMessage("Task has been accepted successfully!");
  };

  function handleClick(item) {
    if (!state.user._id) {
      alert("You must log in first");
      return;
    }

    const taskID = item._id;
    const userID = state.user._id;

    if (clicked === taskID) {
      // Remove the clicked item from local storage
      localStorage.removeItem("clickedItemId");
      setClicked(false);
    } else {
      // Save the clicked item to local storage
      localStorage.setItem("clickedItemId", taskID);
      setClicked(taskID);
      // Mark the task as accepted
      const acceptedTasks =
        JSON.parse(localStorage.getItem("acceptedTasks")) || [];
      acceptedTasks.push(taskID);
      localStorage.setItem("acceptedTasks", JSON.stringify(acceptedTasks));
    }

    handleAdd(item);
    handleDeleteLocally(taskID);
  }

  const handleDeleteLocally = useCallback(
    (id) => {
      console.log("handleDeleteLocally ID", id);
      const newData = state.taskList.filter((item) => item._id !== id);
      dispatch({
        type: "removeTask",
        payload: newData,
      });
    },
    [dispatch, state.taskList]
  );

  return (
    <div className="tasklist-container">
      <Navbar />
      <Box
        sx={{
          height: "vh",
          display: "flex",
          gap: 5,
          maxWidth: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 25,
          background:
          "linear-gradient(90deg, rgba(255,232,210,1) 0%, rgba(196,252,240,1) 100%)",
          color: "black",
        }}
      >

     
        <div className="search-list">
          <input
            placeholder="Search request"
            type="text"
            id="base-input"
            onChange={(e) => setFilter({ ...filter, task: e.target.value })}
            value={filter.task}
            className="list-input"
            title="search-requests"
          />
        </div>
        <div className="filter">
          <button
            type="button"
            onClick={handleApplyFilter}
            className="list-btn-1"
            title="apply-filter"
          >
            <FaFilter />
            Apply filter
          </button>
          <button
            type="button"
            onClick={handleResetFilter}
            className="list-btn-1"
          >
            <RiFilterOffFill title="reset" />
            Reset filter
          </button>
        </div>


        <div className="list-form">
          {state.taskList &&
            state.taskList.map((item) => (
              <div
                key={item._id}
                className={`list-main ${
                  acceptedTasks.includes(item._id) ? "selected" : "deselected"
                }`}
              >
                <div
                // className={`list-main ${
                //   acceptedTasks.includes(item._id) ? "selected" : "deselected"
                // }`}
                >
                  <img
                    src={item.owner?.image}
                    alt="helpee"
                    className="list-image"
                    title="image"
                  />
                  <input
                    type="text"
                    name="place"
                    disabled
                    value={item.owner?.firstName}
                    className="list-input-1"
                    title="name"
                  />
                  <input
                    type="text"
                    name="place"
                    disabled
                    value={item.owner?.email}
                    className="list-input-1"
                    id="user-email"
                    title="email"
                  />

                  <input
                    type="text"
                    name="place"
                    disabled
                    value={item.task}
                    className="list-input-1"
                    title="request"
                  />
                  <p className="list-input-1" title="request-date">
                    {item.taskDate}
                  </p>
                  <p className="list-input-1" title="request-time">
                    {item.taskTime}
                  </p>
                  <p className="list-input-1" title="request-details">
                    {item.taskDetails}
                  </p>
                  <p className="list-input-1" title="request-lcation">
                    {item.location}
                  </p>

                  <div style={{ display: "flex" }}>
                    {state.user._id === item.owner?._id ? (
                      <Link to={"/edittasks/" + item._id}>
                        <FiEdit className="list-btn-2" title="edit-request" />
                      </Link>
                    ) : (
                      ""
                    )}

                    <MdDeleteForever
                      className="list-btn-2"
                      onClick={() => handleDelete(item)}
                      title="delete-request"
                    />
                    <FaHandsHelping
                      className={`list-btn-2 ${
                        clicked === item._id ? "selected" : "deselected"
                      }`}
                      onClick={() => {
                        handleClick(item);
                      }}
                      title="accept-request"
                    />
                  </div>
                </div>
              </div>
            ))}
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
      </Box>
      <Footer2 />
    </div>
  );
}

export default ListTasks;
