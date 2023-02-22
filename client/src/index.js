import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./components/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelperRegister from "./components/HelperRegister";
import HelperLogin from "./components/HelperLogin";
import EmailConfirm from "./components/EmailConfirm";
import HelpeeRegister from "./components/HelpeeRegister";
import Map from "./components/Map";
import MarkerList from "./components/MarkerList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<HelperLogin />} />
        <Route path="/helperregister" element={<HelperRegister />} />
        <Route path="/helpeeregister" element={<HelpeeRegister />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route element={<Map />} path="/map" />
        <Route element={<MarkerList />} path="/markerlist"></Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
