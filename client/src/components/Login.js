import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import "./Login.css";

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
    //

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
     
      }
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
    <>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          gap: 5,
          maxWidth: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          backgroundColor: "#fff3e9",
          color: "#110931",
        }}
      >
        <div>
          <div id="typing">
            <span>One Good Deed At a Time</span>
          </div>
          <div id="crow">|</div>
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
            <RadioGroup
              row
              name="profileType"
              value={data.profileType}
              onChange={handleInputChange}
            >
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
            </RadioGroup>
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
              onChange={(e) => setData({ ...data, password: e.target.value })}
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
      </Box>
    </>
  );
}

export default Login;
