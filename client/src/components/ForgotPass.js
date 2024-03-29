import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import "./Login.css";
import Footer2 from "./Footer2";

import {
  Button,
  Paper,
  Typography,
  Box,
  TextField,
} from "@mui/material";

import Navbar from "./Navbar";

function ForgotPass() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = async () => {
    const response = await axios.post(baseUrl + "/users/forgotpass", data, {
      withCredentials: true,
    });
    console.log("🦩 ~ handleSubmit ~ response", response);

    if (response.data.success)
      alert(
        "We have sent you an email with instructions about how to change your password"
      );
    // notify();
  };

  const handleNavLogin = () => {
    navigate("/");
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
          paddingBottom: 30,
          background:"linear-gradient(90deg, rgba(255,232,210,1) 0%, rgba(196,252,240,1) 100%)",
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
              mb: 12,
              maxWidth: 460,
              backgroundColor: "#018f8c",
              opacity: [1,1,1],
              boxShadow: 10,
            }}
          >   <Typography
          variant="h2"
          align="center"
          pb={10}
          sx={{ color: "white",
                fontFamily: "Barlow, sans-serif",
                fontWeight: 500,
               }}
        >
          Please enter your email
        </Typography>

           
          
        <TextField
              fullWidth
              label="Email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: "#fff2ea",
                    fontFamily: "Barlow, sans-serif",
                    fontWeight: 500,
            }}

            />
            <Button
              fullWidth
              sx={{
                backgroundColor: "#ff7e36 ",
                marginTop: "3px",
                marginBottom: "3px",
                fontFamily: "Barlow, sans-serif",
                fontWeight: 500,
              }}
              variant="contained"   
              size="large"
              
              type="submit"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              sx={{
                backgroundColor: "#ff7e36 ",
                marginTop: "3px",
                marginBottom: "3px",
                fontFamily: "Barlow, sans-serif",
                    fontWeight: 500,
              }}
              variant="contained"   
              size="large"
              onClick={handleNavLogin}
            >
                Login
            </Button>
          
         


        
        </Paper>
      </Box>
      <Footer2 />
    </>
  );
}

export default ForgotPass;
