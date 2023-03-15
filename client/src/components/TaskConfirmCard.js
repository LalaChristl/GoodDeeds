import { MdDeleteForever } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Context } from "./Context";
import { useContext } from "react";
import axios from "axios";

function TaskConfirmCard({ task, cbDelete }) {
  const { state, dispatch } = useContext(Context);

  const handleUpdate = async () => {
    const response = await axios.post("/users/taskconfirm", {
      _id: state.user._id,
      task: task.task._id,
    });
    console.log(" handleupdate", response);

    if (response.data.success) {
      dispatch({
        type: "taskConfirm",
        payload: response.data.task,
      });
    }
  };

  const handleDelete = async (taskId) => {
    const response = await axios.post("/users/removefromconfirm", {
      _id: state.user._id,
      taskId,
    });
    console.log("🚀 ~ handleDelete ~ response", response);

    if (response.data.success) {
      dispatch({
        type: "deleteFromConfirm",
        payload: response.data.task,
      });
      cbDelete(taskId);
    }
  };
  return (
    <div className="list-form">
      <div list-input-div>
        <div className="list-main">
          <img
            src={task.task.owner.image}
            alt="helpee"
            className="list-image"
          />
          <input
            type="text"
            name="place"
            disabled
            value={task.task.owner.firstName}
            className="list-input-1"
          />
          <input
            type="text"
            name="place"
            disabled
            value={task.task.owner.email}
            className="list-input-1"
            id="user-email"
          />
        </div>
        <input
          type="text"
          name="place"
          disabled
          value={task.task}
          className="list-input-1"
        />
        <p className="list-input-1">{task.taskDate}</p>
        <p className="list-input-1">{task.taskTime}</p>
        <p className="list-input-1">{task.taskDetails}</p>
        <p className="list-input-1">{task.task.location}</p>
        <div>
          <button
            className="list-btn"
            onClick={() => handleUpdate(task.task._id)}
          >
            Add Task
          </button>

          <button
            className="list-btn"
            onClick={() => handleDelete(task.task._id)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskConfirmCard;
