import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Context } from "./Context";

const HelpeeProfile = () => {
  const [user, setUser] = useState();

  const { dispatch } = useContext(Context);
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

  return (
    <div>
      {user && (
        <>
          <img src={user.image} alt="" className="h-[200px] w-[200px] " />
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          <p>Languages: {user.languages}</p>
        </>
      )}
      <Link to="/addtasks">
        <button>Help reguest</button>
      </Link>
    </div>
  );
};

export default HelpeeProfile;
