import React from "react";
import { useContext, useEffect, useState } from "react";
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

  console.log("state taskList", state.taskList);
  console.log("state", state);

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

  return (
    <div>
      <Navbar />
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

                <div style={{ display: "flex" }}>
                  <Link to={"/edittasks/" + item._id}>
                    <FiEdit className="list-btn-2" />
                  </Link>

                  <MdDeleteForever
                    className="list-btn-2"
                    onClick={() => handleDelete(item._id)}
                  />
                  <FaHandsHelping
                    className="list-btn-2"
                    onClick={() => handleAdd(item)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListTasks;
