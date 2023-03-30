import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";
import "./Profile.css";
import { Box } from "@mui/material";
const HelpeeProfile = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  const [user, setUser] = useState();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + "/users/getuser2/" + id, {
          withCredentials: true,
        });
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
    const response = await axios.get(baseUrl + "/users/logout", {
      withCredentials: true,
    });
    console.log("🦩 ~ handleLogout ~ response", response);

    dispatch({
      type: "logout",
    });

    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "vh",
          display: "flex",
          maxWidth: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 30,
          background:
            "linear-gradient(90deg, rgba(0,82,70,1) 0%, rgba(196,252,240,1) 100%)",
          color: "black",
        }}
      >
        <div className="flex justify-center">
          <div className="helpee-profile-container">
            {user && (
              <>
                <img src={user.image} alt="" className="profile-image" />
                <p className="helpee-profile-name">{user.userName}</p>
                <div class="profile-text-container">
                  <table>
                    <tr>
                      <td>Name:</td>
                      <td>{user.firstName}</td>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <td>{user.lastName}</td>
                    </tr>
                    <tr>
                      <td>Age:</td>
                      <td>{user.age}</td>
                    </tr>
                    {/* <tr>
                      <td>Gender:</td>
                      <td>{user.gender}</td>
                    </tr> */}
                    <tr>
                      <td>Language(s):</td>
                      <td>{user.languages}</td>
                    </tr>
                    <tr>
                      <td>About Me:</td>
                      <td>{user.about}</td>
                    </tr>
                  </table>
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
      </Box>
      <Footer2 />
    </>
  );
};

export default HelpeeProfile;
