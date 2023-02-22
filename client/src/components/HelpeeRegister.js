import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const HelpeeRegister = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    languages: "",
    image:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  });

  // const [selected, setSelected] = useState("");
  // const changeHandler = (e) => {
  //   setSelected(e.target.value);
  // };

  //   const { state, dispatch } = useContext(Context);

  const handleRegister = async () => {
    const { password, confirmPassword } = data;
    const response = await axios.post("/users/helpeeregister", data);
    console.log("🦩 ~ handleRegister ~ response", response);
    if (password !== confirmPassword) {
      alert("Wrong email or password");
      return;
    }

    if (response.data.success) navigate("/");
  };

  const handleUpload = (img) => {
    if (!img) return;

    // dispatch({ type: "loading_image" });
    // dispatch({ type: "hide_popup" });

    if (img.type === "image/png" || img.type === "image/jpeg") {
      const data = new FormData();

      data.append("file", img);
      data.append("upload_preset", "Volunteer");
      data.append("cloud_name", "dtbrznssn");

      fetch("https://api.cloudinary.com/v1_1/dtbrznssn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Uploaded", data.url);
          setData((prev) => ({ ...prev, image: data.url }));
          // dispatch({ type: "loading_image" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleAlreadyUser = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center">
      <div className="helper-register-container flex flex-col border-[1px] border-black w-[500px] items-center justify-center gap-2">
        <h1>Helpee Register</h1>
        <input
          type="username"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="helper-register-input border-[1px] border-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="helper-register-input border-[1px] border-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="helper-register-input border-[1px] border-black"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          className="helper-register-input border-[1px] border-black"
        />

        <input
          type="text"
          placeholder="Spoken Languages"
          value={data.languages}
          onChange={(e) => setData({ ...data, languages: e.target.value })}
          className="helper-register-input border-[1px] border-black"
        />

        <label className="helper-label-register">
          Select your profile image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </label>
        <img
          className="helper-register-image h-[200px] w-[200px]"
          src={data.image}
          alt=""
        />

        <button
          type="submit"
          onClick={handleRegister}
          className="helper-register-button border-[1px] border-black"
        >
          Register
        </button>

        <p className="p-3" onClick={handleAlreadyUser}>
          Already a user?
        </p>
      </div>
    </div>
  );
};

export default HelpeeRegister;
