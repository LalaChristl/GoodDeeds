import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "./Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/getuser2/" + id);
        setUser(response.data.user);

        const tasksResponse = await axios.get("/tasks/list/");
        setTasks(tasksResponse.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleLogout = async () => {
    const response = await axios.get("/users/logout");
    console.log("🦩 ~ handleLogout ~ response", response);

    dispatch({
      type: "logout",
    });

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/3 max-w-xl p-6 bg-white shadow-lg rounded-lg">
        {user && (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Welcome to your Dashboard, {user.firstName}!
            </h2>
            <img
              src={user.image}
              alt=""
              className="h-48 w-48 rounded-full mx-auto mb-4"
            />

            <div className="mt-8">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">My Tasks</h2>
                {tasks.length > 0 ? (
                  <ul className="divide-y divide-gray-300">
                    {tasks.map((task) => (
                      <li key={task._id} className="py-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {task.task}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {task.details}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          Location: {task.location}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          Date: {task.taskDate} | Time: {task.taskTime}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No tasks found.</p>
                )}
              </div>
            </div>
          </>
        )}

        <Link to="/addtasks">
          <button className="block w-full mt-4 py-2 px-4 border border-gray-400 rounded-md text-gray-700 font-bold hover:bg-gray-100">
            Request Help
          </button>
        </Link>

        <Link to={`/helpeeprofile/getuser2/${id}`}>
          <button className="block w-full mt-4 py-2 px-4 border border-gray-400 rounded-md text-gray-700 font-bold hover:bg-gray-100">
            Go to profile
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="block w-full mt-6 py-2 px-4 border border-gray-400 rounded-md text-gray-700 font-bold hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
