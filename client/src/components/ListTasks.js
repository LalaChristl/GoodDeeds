import React from "react";
import { useContext, useEffect } from "react";
import "./ListTasks.css";
import { Context } from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";

function ListTasks() {
  const { state, dispatch } = useContext(Context);

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

    try {
      const response = await axios.delete(`/tasks/delete/${id}`, {
        data: { owner },
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
  return (
    <div className="list-form">
      {state.taskList &&
        state.taskList.map((item) => (
          <div key={item._id} list-input-div>
            <div className="list-main">
              {/* <img src={item.owner.email} alt="helpee" /> */}
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
  );
}

export default ListTasks;
