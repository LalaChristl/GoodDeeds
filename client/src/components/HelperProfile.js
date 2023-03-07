import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "./Context";

const HelperProfile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  const [user, setUser] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/getuser/" + id);
        console.log("🦩 ~ fetchData ~ response:", response);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    navigate("/editprofile/" + id);
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
      <div className="helper-profile-container flex flex-col items-center gap-2">
        {user && (
          <>
            <img src={user.image} alt="" className="h-[200px] w-[200px] " />
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Languages: {user.languages}</p>
            <button
              onClick={handleEdit}
              className="helper-profile-button border-[1px] border-black p-2"
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
      </div>
    </div>
  );
};

export default HelperProfile;
