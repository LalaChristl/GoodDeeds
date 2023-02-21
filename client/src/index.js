import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./components/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelperRegister from "./components/HelperRegister";
import HelperLogin from "./components/HelperLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/helperlogin" element={<HelperLogin />} />
        <Route path="/helperregister" element={<HelperRegister />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
