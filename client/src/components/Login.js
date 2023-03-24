import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import "./Login.css";
import Footer2 from "./Footer2";

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

function Login() {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await axios.post("/users/login", data);

    if (response.data.success) {
      dispatch({
        type: "login",
        payload: response.data.user,
      });

      navigate(`/dashboard/helpeeProfile/getuser2/${response.data.user._id}`);
    }
  };

  const handleNotUser = () => {
    navigate("/register");
  };

  const handleForgotPass = () => {
    navigate("/forgotpass");
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[screen] border-2 border-red-600 bg-[#eecdb2] text-[#110931]">
      <div className="border-2  gap-5 max-w-[1280px] mx-auto min-w-[360px] overflow-hidden items-center bg-[#fff3e9] text-[#110931]">
        <Navbar />
        <Box
          className="login-box"
          sx={{
            height: "100vh",
            display: "flex",
            gap: 5,
            maxWidth: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 5,
            backgroundColor: "#fff3e9",
            color: "#110931",
            // marginBottom: "-80px",
          }}
        >
          {/* <div>
          <div id="typing">
            <span>One Good Deed At a Time</span>
          </div>
          <div id="crow">|</div>
        </div> */}
          <div className="flex flex-col justify-center items-center ">
            <div className="login-scroller-container">
              <h1 className="login-h1">
                Good Deeds
                {/* <!-- Scroller Start --> */}
                <div className="login-scroller">
                  <span>
                    Connect
                    <br />
                    Engage
                    <br />
                    Empower
                  </span>
                </div>
                {/* <!-- Scroller End --> */}
              </h1>
            </div>
            <div>
              <Paper
                sx={{
                  p: 4,
                  mt: 8,
                  mb: 12,
                  maxWidth: 460,
                  backgroundColor: "#ffaf66 ",
                }}
              >
                <Typography variant="h2" align="center" mb={4}>
                  Login
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#fff3e9" }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#fff3e9" }}
                />
                <Typography
                  align="center"
                  mt={2}
                  mb={1}
                  sx={{ cursor: "pointer" }}
                  onClick={handleForgotPass}
                >
                  Forgot Password?
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{ backgroundColor: "#0d2237" }}
                  size="large"
                  fullWidth
                >
                  Sign In
                </Button>
                <Typography
                  align="center"
                  mt={2}
                  sx={{ cursor: "pointer" }}
                  onClick={handleNotUser}
                >
                  Not a user yet?
                </Typography>
              </Paper>
            </div>
          </div>
        </Box>
        <Footer2 />
      </div>
    </div>
  );
}

export default Login;
