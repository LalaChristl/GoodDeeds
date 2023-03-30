import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChangePass = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { token } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    retypepassword: "",
  });

  const handleSubmit = async () => {
    if (!data.password || data.password !== data.retypepassword)
      return alert("passwords do not match");
    const response = await axios.post(
      baseUrl + "/users/changepass",
      {
        token,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    console.log("🦩 ~ getData ~ response", response);

    if (response.data.success) {
      alert("Password changed successfully");
      navigate("/");
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="change-password flex justify-center">
      <div className="container-2-login flex flex-col border-[1px] border-black w-[500px] items-center justify-center gap-2 p-[50px]">
        <h1 className="h1-login">Change Password</h1>
        <input
          type="password"
          placeholder="Type your new password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="change-pass-input border-[1px] border-black"
        />
        <input
          type="password"
          placeholder="Re-type your new Password"
          value={data.retypepassword}
          onChange={(e) => setData({ ...data, retypepassword: e.target.value })}
          className="change-pass-input border-[1px] border-black"
        />

        <button
          className="change-pass-button border-[1px] border-black"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <p className="change-pass-p-3" onClick={handleLogin}>
          Login
        </p>
      </div>
    </div>
  );
};

export default ChangePass;
