import React from "react";
import "./frame.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
// import Map from "./map";
// import { Table } from "@mui/material";
// import BasicTable from "./basicTable";
function Frame() {
  const username = "Boi";
  const email = "Boi@web.de";
  const phoneNumber = 12345;
  const adress = "1234th street";
  const organisation1 = "Red Cross";
  const needs1 = "Donations";
  const helpee1 = "Oscar K.";
  const needs2 = "Help with documents";
  return (
    <div class="container">
      <div class="card color-5">
        <div class="card-header color-6">
          <h2>SOS - Helper</h2>
        </div>
        <div class="card-body color-3">
          <div class="color-6">
            <div class="profile-container">
              <h3>Profile</h3>
              <p>
                <AiOutlineCalendar />
              </p>
            </div>
            <div class="list-container">
              <ul>
                <li>Username : {username}</li>
                <li>Email : {email}</li>
                <li>Phone Number : {phoneNumber}</li>
                <li>Adress : {adress}</li>
                <li>Username : {username}</li>
                <li>Email : {email}</li>
                <li>Phone Number : {phoneNumber}</li>
                <li>Adress : {adress}</li>
              </ul>
            </div>
            <div class="profile-container">
              <h3>Where can I help?</h3>
              <p>
                <FaLocationArrow />
              </p>
            </div>
            <div class="list-container">
              <ul>
                <li>Organisation: {organisation1}</li>
                <li>Need: {needs1}</li>
                <li>Adress : {adress}</li>
              </ul>
            </div>
            <div class="list-container">
              <ul>
                <li>Helpee: {helpee1}</li>
                <li>Needs: {needs2}</li>
                <li>Adress : {adress}</li>
              </ul>
            </div>
            <button class="btn color-2">Help now!</button>
          </div>
          <div></div>
        </div>
        <div class="card-footer color-5">lol</div>
      </div>
    </div>
  );
}
export default Frame;
