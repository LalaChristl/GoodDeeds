import { MdDeleteForever } from "react-icons/md";
import "./TaskConfirmCard.css";
import { Context } from "./Context";
import { useContext } from "react";
import axios from "axios";
import { BsMailbox } from "react-icons/bs";

function TaskConfirmCard({ task, cbDelete }) {
  const { state, dispatch } = useContext(Context);

  // SendEmail Function
  function sendEmail() {
    const userEmail = document.getElementById("user-email").value;
    const emailLink = "mailto:" + userEmail;
    window.open(emailLink);
  }

  // HandleDelete Function
  const handleDelete = async (taskId) => {
    console.log("taskId", taskId);
    const response = await axios.post("/users/removefromconfirm", {
      user: state.user._id,
      task: taskId,
    });
    console.log("🇯🇲 handleDelete ~ response", response);

    if (response.data.success) {
      await dispatch({
        type: "deleteFromConfirm",
        payload: taskId, // pass the ID of the deleted task as payload
      });
      // cbDelete(taskId); // delete the task from the local state
      fetchTaskList(); // fetch the updated task list from the server
    }
  };
  // Function to fetch task list
  const fetchTaskList = async () => {
    const response = await axios.get(
      "/users/listtaskconfirm/" + state.user._id
    );

    console.log("fetchTaskList ~ response", response);

    if (response.data.success) {
      const updatedTasks = response.data.tasks;
      dispatch({
        type: "setTaskConfirm",
        payload: updatedTasks, // update the task list in the global state
      });
    }
  };
  // Date Convert functions
  const taskDate = new Date(task.taskDate);
  const day = taskDate.getDate();
  const month = taskDate.toLocaleString("default", { month: "long" });
  const year = taskDate.getFullYear();

  return (
    <div className="accept-form">
      <div list-input-div>
        <div className="accept-main">
          <img
            src={task.owner.image}
            alt="helpee"
            className="accept-image"
            title="helpee-image"
          />
          <input
            type="text"
            name="place"
            disabled
            value={task.owner.firstName}
            className="accept-input-1"
            title="helpee"
          />
          <input
            type="text"
            name="place"
            disabled
            value={task.owner.email}
            className="accept-input-1"
            id="user-email"
            title="request email"
          />
        </div>
        <input
          type="text"
          name="place"
          disabled
          value={task.task}
          className="accept-input-1"
          title="request"
        />
        <p className="accept-input-1" title="date">
          {`${day} ${month} ${year}`}
        </p>
        <p className="accept-input-1" title="time">
          {task.taskTime}
        </p>
        <p className="accept-input-1" title="details">
          {task.taskDetails}
        </p>
        <p className="accept-input-1" title="location">
          {task.location}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MdDeleteForever
            onClick={() => {
              handleDelete(task._id);
              cbDelete(task.task._id);
            }}
            className="accept-icon"
            title="delete-request"
          />

          <BsMailbox
            value={task.owner.email}
            className="accept-icon"
            onClick={sendEmail}
            title="Send Email"
          />
        </div>
      </div>
    </div>
  );
}

export default TaskConfirmCard;
