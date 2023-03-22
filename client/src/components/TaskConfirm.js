import { useContext, useEffect, useState } from "react";
import "./TaskConfirmCard.css";

import axios from "axios";
import { Context } from "./Context";

import TaskConfirmCard from "./TaskConfirmCard";
import CalendarFunction from "./Calendar";
import TaskMap from "./TaskMap";
function TaskConfirm() {
  const { state } = useContext(Context);
  console.log("state", state);
  const [task, setTask] = useState([]);

  const handleDeleteLocally = (id) => {
    const oldData = task.filter((item) => item.task._id !== id);

    setTask(oldData);
  };

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "/users/listtaskconfirm/" + state.user._id
      );

      console.log(" getData ~ response", response);

      if (response.data.success) setTask([...response.data.tasks]);
    }

    getData();
  }, []);
  console.log("task", task);
  return (
    <div className="taskconfirm1-container">
      <div className="taskconfirm-container">
        <h1 className="taskconfirm-heading">Accepted Requests</h1>
        {task.length
          ? task.map((item, idx) => (
              <TaskConfirmCard
                key={idx}
                task={item}
                cbDelete={handleDeleteLocally}
              />
            ))
          : "No accepted requests"}
        <div className="calender-map-container">
          <div className="calendar">
            <CalendarFunction task={task} />
          </div>
          <div className="taskmap">
            <TaskMap task={task} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskConfirm;
