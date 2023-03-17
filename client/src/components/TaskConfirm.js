import { useContext, useEffect, useState } from "react";

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
    <div className="flex items-center w-full h-[100vh] bg-slate-50 flex-col ">
      {task.length
        ? task.map((item, idx) => (
            <TaskConfirmCard
              key={idx}
              task={item}
              cbDelete={handleDeleteLocally}
            />
          ))
        : "No accepted requests"}
      <div className="calendar">
        <CalendarFunction task={task} />
      </div>
      <div>
        <TaskMap task={task} />
      </div>
    </div>
  );
}

export default TaskConfirm;
