import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "./Context";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";
import "./Dashboard.css";
import TaskConfirm from "./TaskConfirm";
import { Box } from "@mui/material";

const Dashboard = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  console.log("dashboard task", tasks);
  console.log("dashboard user.id", state.user._id);
  const { id } = useParams();
  useEffect(() => {
    console.log("Dashboard mounted with id:", id);
    console.log("Location:", location.pathname, location.search);
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + "/users/getuser2/" + id, {
          withCredentials: true,
        });
        setUser(response.data.user);
        const tasksResponse = await axios.get(baseUrl + "/tasks/list/", {
          withCredentials: true,
        });
        setTasks(tasksResponse.data.tasks);
        console.log("Tasks", tasksResponse.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, location]);
  const handleLogout = async () => {
    const response = await axios.get(baseUrl + "/users/logout", {
      withCredentials: true,
    });
    console.log(":flamingo: ~ handleLogout ~ response", response);
    dispatch({
      type: "logout",
    });
    navigate("/");
  };
  return (
    <div className="w-[screen] border-2 border-red-600 bg-[#eecdb2] text-[#110931]">
    <div className="border-2  gap-5 max-w-[full] mx-auto min-w-[360px] overflow-hidden items-center bg-[#fff3e9] text-[#110931]">
    <div key={id}>
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
          paddingTop: 15,
          paddingBottom: 25,
          paddingLeft: 5,
          background:
            "linear-gradient(90deg, rgba(255,232,210,1) 0%, rgba(196,252,240,1) 100%)",
          color: "black",
        }}
      >
        <div class="dashboard-container">
          <div class="dashboard-card">
            {user && (
              <>
                <h2 class="dashboard-heading">
                  Welcome to your Dashboard, {user?.firstName}!
                </h2>
                <img src={user?.image} alt="" class="dashboard-image" />

                <div class="dashboard-tasks">
                  <div class="dashboard-tasks-header">
                    <h1 class="dashboard-tasks-heading">My Tasks</h1>
                  </div>
                  {tasks.length > 0 ? (
                    <ul class="dashboard-tasks-list">
                      {tasks.map(
                        (task) =>
                          task.owner?._id === state.user._id && (
                            <li key={task._id} class="dashboard-task">
                              <h3 class="dashboard-task-heading">
                                {task.task}
                              </h3>
                              <p class="dashboard-task-details">
                                {task.taskDetails}
                              </p>
                              <p class="dashboard-task-location">
                                Location: {task.location}
                              </p>
                              <p class="dashboard-task-date">
                                Date: {task.taskDate} | Time: {task.taskTime}
                              </p>
                            </li>
                          )
                      )}
                    </ul>
                  ) : (
                    <p class="dashboard-no-tasks">No tasks found.</p>
                  )}
                </div>
              </>
            )}

            <Link to="/addtasks" class="dashboard-button">
              Request Help
            </Link>

            <Link to="/listtasks" class="dashboard-button">
              Tasks List
            </Link>

            <Link to={`/helpeeprofile/getuser2/${id}`} class="dashboard-button">
              Go to profile
            </Link>

            <button onClick={handleLogout} class="dashboard-logout-button">
              Logout
            </button>
          </div>
          <TaskConfirm />
        </div>
      </Box>
      <Footer2 />
    </div>
    </div>
    </div>
  );
};
export default Dashboard;
