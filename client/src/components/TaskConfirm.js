import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Context } from "./Context";

import TaskConfirmCard from "./TaskConfirmCard";
function TaskConfirm() {
  const { state } = useContext(Context);

  const [task, setTask] = useState([]);

  const handleDeleteLocally = (id) => {
    const oldData = task.filter((item) => item.task._id !== id);

    setTask(oldData);
  };

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/users/listtask/" + state.user._id);

      console.log(" getData ~ response", response);

      if (response.data.success) setTask([...response.data.tasks]);
    }

    getData();
  }, []);

  return (
    <div className="flex items-center w-full h-[100vh] bg-slate-50 flex-col gap-[20px]">
      {task.length
        ? task.map((item, idx) => (
            <TaskConfirmCard
              key={idx}
              task={item}
              cbDelete={handleDeleteLocally}
            />
          ))
        : "Your cart is empty"}
    </div>
  );
}

export default TaskConfirm;
