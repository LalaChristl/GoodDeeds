import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HelpeeProfile = () => {
  const [user, setUser] = useState();
const {id} = useParams();
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('/users/getuser2/' + id);
      console.log(response);
      setUser(response.data.user);
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
      <img src={user.image} alt="" className='h-[200px] w-[200px] ' />
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p>Languages: {user.languages}</p>
      </>
    )}
  </div>
);
};

export default HelpeeProfile;