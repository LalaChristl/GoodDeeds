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


function ForgotPass() {

    const navigate = useNavigate();
    const [data, setData] = useState({
      email: "",
    });
  
    const handleSubmit = async () => {
      const response = await axios.post("/users/forgotpass", data);
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
          >
            <Typography variant="h3" align="center" mb={4} sx={{color:"white"}}>
            Please enter your email
            </Typography>
            
            <TextField
                fullWidth
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
                margin="normal"
                variant="outlined"
                sx={{ backgroundColor: "#fff3e9" 
                    }}

            />
          
          
            <Button
              fullWidth
              sx={{
                backgroundColor: "#ff7e36 ",
                marginTop: "3px",
                marginBottom: "3px",
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
