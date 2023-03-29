import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button, Paper, Typography, Box } from "@mui/material";

import "./Login.css";
import Navbar from "./Navbar";
import Footer2 from "./Footer2";

import { baseUrl } from "../config/baseUrl.js";

function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await axios.post(baseUrl + "/users/login", data, {
      withCredentials: true,
    });

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

  const useStyles = makeStyles((theme) => ({
    header: {
      width: "100%",
      minWidth: 375,
      height: 400,
      position: "relative",
      overflow: "hidden",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(70%)",
    },
    heroContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-25%, -25%)",
      textAlign: "center",
    },
    heroTitle: {
      fontWeight: "bold",
      fontSize: "2rem",
      color: "#fff",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      marginBottom: theme.spacing(2),
    },
    searchbar: {
      color: "#fff",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      padding: "10px 10px",
      border: "0px",
      display: "flex",
    },
  }));
  const classes = useStyles();

  return (
    <div className="w-[screen] border-2 border-red-600 bg-[#EECDB2] text-[#110931]">
      <div className="border-2  gap-5 max-w-[full] mx-auto min-w-[360px] overflow-hidden items-center bg-[#FFF3E9] text-[#110931]">
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
            paddingTop: 5,
            background:
              "linear-gradient(90deg, rgba(0,82,70,1) 0%, rgba(196,252,240,1) 100%)",
            color: "black",
          }}
        >
          <Typography>
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
            </div>
          </Typography>
          <Paper
            sx={{
              p: 4,
              mt: 8,
              mb: 25,
              maxWidth: 460,
              backgroundColor: "#ff7e36",
              opacity: [1, 1, 1],
              boxShadow: 10,
            }}
          >
            <Typography
              variant="h2"
              align="center"
              pb={10}
              sx={{ color: "white" }}
            >
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
              sx={{
                backgroundColor: "#018f8c ",
              }}
              variant="contained"
              onClick={handleLogin}
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
        </Box>
        <Footer2 />
      </div>
    </div>
  );
}

export default Login;
