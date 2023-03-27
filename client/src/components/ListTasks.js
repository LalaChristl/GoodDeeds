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

import Navbar from "./Navbar";
import { FaHandsHelping } from "react-icons/fa";
import Footer2 from "./Footer2";

function ListTasks() {
  // Global Context
  const { state, dispatch } = useContext(Context);
  // State to set task locally
  const [task, setTask] = useState([]);

  // State for searching/filtering
  const [filter, setFilter] = useState({ task: "" });

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
  };

  const handleDeleteLocally = useCallback(
    (id) => {
      console.log("handleDeleteLocally ID", id);
      const newData = task.filter((item) => item.task._id !== id);
      setTask(newData);
      dispatch({
        type: "removeTask",
        payload: id,
      });
    },
    [dispatch, task] // depend on task state and dispatch function
  );

  return (
    <div className="tasklist-container">
      <Navbar />
      <div className="search-list-1">
        {/* <Link
          to="/dashboard/helpeeprofile/getuser2/:id"
          className="list-link"
          title="back to dashboard"
        >
          <button className="dash-btn">Dashboard</button>
        </Link> */}
      </div>
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
            <div key={item._id} list-input-div>
              <div className="list-main">
                <img
                  src={item.owner.image}
                  alt="helpee"
                  className="list-image"
                  title="image"
                />
                <input
                  type="text"
                  name="place"
                  disabled
                  value={item.owner.firstName}
                  className="list-input-1"
                  title="name"
                />
                <input
                  type="text"
                  name="place"
                  disabled
                  value={item.owner.email}
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
                    className="list-btn-2"
                    onClick={() => {
                      handleAdd(item);
                      handleDeleteLocally(item._id);
                    }}
                    title="accept-request"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer2 />
    </div>
  );
}

export default ListTasks;
