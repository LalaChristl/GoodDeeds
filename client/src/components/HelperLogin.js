import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";

const HelperLogin = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await axios.post("/users/helperlogin", data);
    console.log("🦩 ~ handleLogin= ~ response", response);

    if (response.data.success) {
      dispatch({
        type: "login",
        payload: response.data.user,
      });

      navigate("/");
    }
  };

  const handleNotUser = () => {
    navigate("/helperregister");
  };
  return (
    <div className="flex justify-center">
      <div className="container-helper-login flex flex-col border-[1px] border-black w-[500px] items-center justify-center gap-2 p-[50px]">
        <h1 className="h1-helper-login">Welcome to Volunteer Land!</h1>
        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="helper-login-input border-[1px] border-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="helper-login-input border-[1px] border-black"
        />
        {/* <p className="p-2" onClick={handleForgotPass}>
          Forgot Password?
        </p> */}
        <button
          className="helper-login-button border-[1px] border-black"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <p className="helper-login-p" onClick={handleNotUser}>
          Not a user yet?
        </p>
      </div>
    </div>
  );
};

export default HelperLogin;
