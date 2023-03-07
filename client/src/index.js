import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./components/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EmailConfirm from "./components/EmailConfirm";
import ForgotPass from "./components/ForgotPass";
import ChangePass from "./components/ChangePass";
import EditProfileHelper from "./components/EditProfileHelper";
import EditProfileHelpee from "./components/EditProfileHelpee";

import Map from "./components/Map";
import MarkerList from "./components/MarkerList";
import HelperProfile from "./components/HelperProfile";
import HelpeeProfile from "./components/HelpeeProfile";
import AddTasks from "./components/AddTasks";
import ListTasks from "./components/ListTasks";
import EditTasks from "./components/EditTasks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/changepass/:token" element={<ChangePass />} />

        <Route path="/helperprofile/getuser/:id" element={<HelperProfile />} />

        <Route path="/helpeeprofile/getuser2/:id" element={<HelpeeProfile />} />
        <Route path="/editprofile/:id" element={<EditProfileHelper />} />

        <Route path="/editprofile2/:id" element={<EditProfileHelpee />} />

        <Route element={<Map />} path="/map" />
        <Route element={<MarkerList />} path="/markerlist"></Route>
        <Route path="/addtasks/" element={<AddTasks />}></Route>
        <Route path="/listtasks/" element={<ListTasks />}></Route>
        <Route path="/edittasks/:id" element={<EditTasks />}></Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
