import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";
import { Context } from "./Context";

import TaskConfirmCard from "./TaskConfirmCard";
import CalendarFunction from "./Calendar";
import TaskMap from "./TaskMap";

function TaskConfirm() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { state, dispatch } = useContext(Context);

  // State to set task locally
  const [task, setTask] = useState([]);

  // Function to delete task locally
  // const handleDeleteLocally = (id) => {
  //   console.log("handleDeleteLocally ID", id);
  //   const oldData = task.filter((item) => item.task._id !== id);

  //   setTask(oldData);
  // };
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

  // Function to display your tasks coming from the server
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        baseUrl + "/users/listtaskconfirm/" + state.user._id,
        {
          withCredentials: true,
        }
      );

      console.log(" getData ~ response", response);

      if (response.data.success) setTask([...response.data.tasks]);
    }

    getData();
  }, []);

  return (
    <div className="taskconfirm1-container">
      <div className="taskconfirm-container">
        <h1 className="taskconfirm-heading">Accepted Requests</h1>
        <div className="calender-map-container">
          <div className="calendar">
            <CalendarFunction task={task} />
          </div>
          <div className="taskmap">
            <TaskMap task={task} />
          </div>
        </div>
        {task.length
          ? task.map((item, idx) => (
              <TaskConfirmCard
                key={idx}
                task={item}
                cbDelete={handleDeleteLocally}
              />
            ))
          : "No accepted requests"}
      </div>
    </div>
  );
}

export default TaskConfirm;
