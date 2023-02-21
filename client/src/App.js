import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelperRegister from "./components/HelperRegister";
import HelperLogin from "./components/HelperLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/helperlogin" element={<HelperLogin />} />
        <Route path="/helperregister" element={<HelperRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
