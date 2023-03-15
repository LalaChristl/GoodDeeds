import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Login = () => {
  
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await axios.post("/users/login", data);
    console.log("🦩 ~ handleLogin= ~ response", response);

    if (response.data.success) {
      dispatch({
        type: "login",
        payload: response.data.user,
      });

      const selectedProfileType = document.querySelector(
        'input[name="profileType"]:checked'
      ).value;
      if (selectedProfileType === "helper") {
        navigate(`/dashboard/helperProfile/getuser/${response.data.user._id}`);
      } else if (selectedProfileType === "helpee") {
        navigate(`/dashboard/helpeeProfile/getuser2/${response.data.user._id}`);
      } else {
        alert("Please select a profile type");
      }
    }
  };

  const handleNotUser = () => {
    navigate("/register");
  };

  const handleForgotPass = () => {
    navigate("/forgotpass");
  };



  
 

  return (
    <>
     <Navbar />
     {/* Div for every page so we have a nice looking navbar */}
    <div className="flex max-w-full flex-col items-center bg-[#fff3e9] text-[#110931]">
      <div className="flex mt-40 mb-60 h-full">
      <div className="container-login flex flex-col border w-96 items-center justify-center gap-4 p-10  bg-[#ffaf66] rounded-xl shadow-md" style={{ boxShadow: '0px 4px 8px rgba(25, 14, 3, 0.4)' }}>

        <h1 className="text-5xl font-bold text-[#110931]">Login</h1>
        <div className="flex flex-col gap-2 ">

          <label className="flex items-center gap-2 p-2">
            <input type="radio" name="profileType" value="helper" />
            <span>Helper</span>
          </label>
          <label className="flex items-center gap-2 p-2">
            <input type="radio" name="profileType" value="helpee" />
            <span>Helpee</span>
          </label>

          <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="border border-[#ffaf66] rounded-lg p-2 w-full text-[#110931]"
          />
          <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="border border-[#ffaf66] rounded-lg p-2 w-full"
          />
        

        
          
        </div>

          <p className="py-2 text-[#110931] cursor-pointer " onClick={handleForgotPass}>
            Forgot Password?
            </p>
          <button
            className="border border-black rounded-lg py-2 px-4 bg-[#0d2237] text-white hover:scale-110 duration-500 "
            onClick={handleLogin}>
            Sign In
          </button>
          <p className="py-2 text-[#110931] cursor-pointer" onClick={handleNotUser}>
            Not a user yet?
          </p>

      </div>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default Login;

