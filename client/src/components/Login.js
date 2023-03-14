import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";


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
    <div className="flex justify-center">
      <div className="container-login flex flex-col border-[1px] border-black w-[500px] items-center justify-center gap-2 p-[50px]">
        <h1 className="h1-login text-[15rem]">Welcome to Login!</h1>
        <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="login-input border-[1px] border-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="login-input border-[1px] border-black"
        />
        <div className="flex flex-col gap-2">
          <label>
            <input type="radio" name="profileType" value="helper" />
            Helper
          </label>
          <label>
            <input type="radio" name="profileType" value="helpee" />
            Helpee
          </label>
        </div>

        <p className="p-2" onClick={handleForgotPass}>
          Forgot Password?
        </p>
        <button
          className="login-button border-[1px] border-black"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <p className="login-p" onClick={handleNotUser}>
          Not a user yet?
        </p>
      </div>
    </div>
  );
};

export default Login;


