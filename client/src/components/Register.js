import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Context } from "./Context";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    // address: "",
    // phonenumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
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
    const response = await axios.post("/users/register", data);
    console.log("🦩 ~ handleRegister ~ response", response);
    if (password !== confirmPassword) {
      alert("Wrong email or password");
      return;
    }

    if (response.data.success) navigate("/");
  };

  const handleUpload = (img) => {
    if (!img) return;

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
      <div className="register-container flex flex-col border-[1px] border-black w-[500px] items-center justify-center gap-2">
        <h1 className="register-h1 text-[15rem]">Register</h1>
        <input
          type="name"
          placeholder="First Name"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className="register-input border-[1px] border-black"
        />
        <input
          type="name"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className="register-input border-[1px] border-black"
        />
        <input
          type="name"
          placeholder="User Name"
          value={data.userName}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
          className="register-input border-[1px] border-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="register-input border-[1px] border-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="register-input border-[1px] border-black"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          className="register-input border-[1px] border-black"
        />
        <div>
          <p>Please select your gender</p>
          <input
            type="radio"
            name="genders"
            className="register-gender"
            value="woman"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
          <label htmlFor="woman">Woman</label>
          <input
            type="radio"
            name="genders"
            className="register-gender"
            value="man"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          />
          <label htmlFor="man">Man</label>
          {/* <input
            type="radio"
            name="genders"
            className="gender"
            value="custom"
            checked={selected === "custom"}
            onChange={changeHandler}
          />
          <label htmlFor="custom">Custom</label>
          <input
            type="text"
            aria-hidden={selected !== "male" ? true : false}
            className="border-[1px] border-black"
          /> */}
        </div>
        <input
          type="age"
          placeholder="Age"
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          className="register-input border-[1px] border-black"
        />
        <input
          type="text"
          placeholder="Spoken Languages"
          value={data.languages}
          onChange={(e) => setData({ ...data, languages: e.target.value })}
          className="register-input border-[1px] border-black"
        />

        <label className="register-label">
          Select your profile image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </label>
        <img
          className="register-image h-[200px] w-[200px]"
          src={data.image}
          alt=""
        />

        <button
          type="submit"
          onClick={handleRegister}
          className="register-button border-[1px] border-black"
        >
          Register
        </button>

        <p className="register-p-3" onClick={handleAlreadyUser}>
          Already a user?
        </p>
      </div>
    </div>
  );
};

export default Register;
