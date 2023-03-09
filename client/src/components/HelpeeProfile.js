import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "./Context";

const HelpeeProfile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  const [user, setUser] = useState();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/getuser2/" + id);
        console.log(response);
        setUser(response.data.user);
        dispatch({
          type: "getUser2",
          payload: response.data.user,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleEdit = () => {
    navigate("/editprofile2/" + id);
  };

  const handleLogout = async () => {
    const response = await axios.get("/users/logout");
    console.log("🦩 ~ handleLogout ~ response", response);

    dispatch({
      type: "logout",
    });

    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="helpee-profile-container flex flex-col items-center gap-2">
        {user && (
          <>
            <img src={user.image} alt="" className="h-[200px] w-[200px] " />
            <p>Name: {user.firstName}</p>
            {/* <p>Last Name: {user.lastName}</p> */}
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Languages: {user.languages}</p>
            <p>About Me: {user.about}</p>

            <button
              onClick={handleEdit}
              className="helpee-profile-button border-[1px] border-black p-2"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="helper-profile-button border-[1px] border-black p-2"
            >
              Logout
            </button>
          </>
        )}
        <Link to="/addtasks">
          <button className="helpee-profile-button border-[1px] border-black p-2">
            Help request
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HelpeeProfile;
