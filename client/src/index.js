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

import Map from "./components/Map";
import MarkerList from "./components/MarkerList";
import AddTasks from "./components/AddTasks";

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

        <Route element={<Map />} path="/map" />
        <Route element={<MarkerList />} path="/markerlist"></Route>
        <Route element={<AddTasks />} path="/addtasks"></Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
