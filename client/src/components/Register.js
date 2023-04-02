import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";

// import { Context } from "./Context";
import axios from "axios";
const Register = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

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
    const response = await axios.post(baseUrl + "/users/register", data, {
      withCredentials: true,
    });
    console.log(":flamingo: ~ handleRegister ~ response", response);
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
    <div className="w-[screen] border-2 border-red-600 bg-[#EECDB2] text-[#110931]">
      <div className="border-2  gap-5 max-w-[full] mx-auto min-w-[360px] overflow-hidden items-center bg-[#FFF3E9] text-[#110931]">
        <Navbar />
        <Box
          sx={{
            height: "vh",
            display: "flex",
            gap: 5,
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10,
            background:"linear-gradient(90deg, rgba(255,232,210,1) 0%, rgba(196,252,240,1) 100%)",
            color: "black",
          }}
        >
          <Paper
            sx={{
              p: 4,
              mt: 8,
              mb: 12,
              maxWidth: 460,
              backgroundColor: "#018f8c",
              opacity: [1,1,1],
              boxShadow: 10,
            }}
          >
            <Typography
              variant="h2"
              align="center"
              mb={4}
              sx={{ color: "white",
              fontFamily: "Barlow, sans-serif",
              fontWeight: 500, }}
            >
              Register
            </Typography>
            {/* <RadioGroup row name="profileType" value={data.profileType}>
            <FormControlLabel
              value="helper"
              control={<Radio />}
              label="Helper"
            />
            <FormControlLabel
              value="helpee"
              control={<Radio />}
              label="Helpee"
            />
          </RadioGroup> */}
            <div className="flex justify-center items-center mt-10">
              <img
                className="rounded-full h-28 w-28 border-4 border-white"
                src={data.image}
                alt="avatar"
              />
            </div>
            <div className="flex justify-center items-center mt-4 mb-10">
              <Button
                variant="contained"
                component="label"
                mt={2}
                mb={2}
                onChange={(e) => handleUpload(e.target.files[0])}
                sx={{ backgroundColor: "#ff7e36" ,
                fontFamily: "Barlow, sans-serif",
                fontWeight: 500,}}
                
                size="small"
              >
                Upload Image
                <input type="file" hidden />
              </Button>
            </div>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: "#FFF3E9" }}
            />
          
       
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Username"
            name="userName"
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          {/* <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          /> */}
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
          <TextField
            fullWidth
            label="Languages"
            name="languages"
            value={data.languages}
            onChange={(e) => setData({ ...data, languages: e.target.value })}
            margin="normal"
            variant="outlined"
            sx={{ backgroundColor: "#FFF3E9" }}
          />
         
          <div className="flex justify-center items-center mt-5">
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#ff7e36",
              fontFamily: "Barlow, sans-serif",
              fontWeight: 500, }}
              size="large"
              fullWidth
              //disabled={!handlePasswordMatch()}
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
         
            <div className="flex justify-center items-center mt-3">
              <Typography variant="body2" align="center" mb={2} sx={{fontFamily: "Barlow, sans-serif",
                    fontWeight: 500,}}>
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleAlreadyUser}
                >
                  Login
                </span>
              </Typography>
            </div>
          </Paper>
        </Box>
        <Footer2 />
      </div>
    </div>
  );
};
export default Register;
