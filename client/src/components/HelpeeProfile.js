import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";
import "./Profile.css";

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
    <>
    <Navbar />
    <div className="flex justify-center">
      <div className="helpee-profile-container">
        {user && (
          <>
            <img src={user.image} alt="" className="profile-image" />
            <p className="helpee-profile-name">{user.firstName}</p>
            <div className="profile-text-container">
            <p className="profile-text">Name: {user.firstName}</p>
            <p className="profile-text">Last Name: {user.lastName}</p>
            <p className="profile-text">Age: {user.age}</p>
            <p className="profile-text">Gender: {user.gender}</p>
            <p className="profile-text">Language(s): {user.languages}</p>
            <p className="profile-text">About Me: {user.about}</p>
            </div>

            
            <button onClick={handleEdit} className="profile-button">
              Edit Profile
            </button>
            <button onClick={handleLogout} className="profile-button">
              Logout
            </button>
            
          </>
        )}
        <Link to="/addtasks">
          <button className="profile-button">Help Request</button>
        </Link>
      </div>
    </div>
    <Footer2 />
  </>
  );
};

export default HelpeeProfile;
