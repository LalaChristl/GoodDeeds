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

import { Box } from "@mui/material";

function ListTasks() {
  // Global Context
  const { state, dispatch } = useContext(Context);
  // State to set task locally
  const [task, setTask] = useState([]);

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
    const response = await axios.post("/tasks/search", filter);
    console.log("(🇯🇲 handleApplyFilter listTasks", response);
    if (response.data.success) {
      dispatch({ type: "listTask", payload: response.data.task });
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
  // function to display tasks
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
  const handleDelete = async (item) => {
    const owner = item.owner._id;
    const id = item._id;
    const userID = state.user._id;
    console.log("🇯🇲 handleDelete ~ id, owner", id, owner);

    if (!id || !owner === "") {
      console.log("Invalid data for task deletion");
      return;
    }

    try {
      const response = await axios.delete(`/tasks/delete/${id}`, {
        data: { owner, id, userID },
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

  // Function t accept task
  const handleAdd = async (item) => {
    if (!state.user._id) {
      alert("You must log in first");
      return;
    }

    const response = await axios.post("/users/taskconfirm", {
      _id: state.user._id,
      task: item,
    });
    console.log("🚀 ~ handleAdd ~ response", response);

    if (response.data.success)
      dispatch({
        type: "taskConfirm",
        payload: response.data.task,
      });
    alert("Task has been accepted successfully!"); // display success message
  };

  // function handleClick(item) {
  //   // setClicked(item._id);
  //   handleAdd(item);
  //   handleDeleteLocally(item._id);
  //   // handleAdd1(item);
  //   if (clicked === item._id) {
  //     // Remove the clicked item from local storage
  //     localStorage.removeItem("clickedItemId");
  //     setClicked(null);
  //   } else {
  //     // Handle adding the task here

  //     // Save the clicked item to local storage
  //     localStorage.setItem("clickedItemId", item._id);
  //     setClicked(...item._id);
  //   }
  // }

  // const handleDeleteLocally = useCallback(
  //   (id) => {
  //     console.log("handleDeleteLocally ID", id);
  //     const newData = task.filter((item) => item.task._id !== id);
  //     setTask(newData);
  //     dispatch({
  //       type: "removeTask",
  //       payload: id,
  //     });
  //   },
  //   [dispatch, task] // depend on task state and dispatch function
  // );
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
        payload: id,
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
            background: "linear-gradient(90deg, rgba(0,82,70,1) 0%, rgba(196,252,240,1) 100%)",
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
                  <Link to={"/edittasks/" + item._id}>
                    <FiEdit className="list-btn-2" title="edit-request" />
                  </Link>

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
      </Box>
      <Footer2 />
    </div>
  );
}

export default ListTasks;
