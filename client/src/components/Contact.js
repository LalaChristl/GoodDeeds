
import Footer2 from "./Footer2";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "./Navbar";


function Contact() {

  function sendEmail() {
    const userEmail = document.getElementById("user-email").value;
    const recipientEmail = "your-email@example.com"; // replace with your email address
    const subject = "Contact Request";
    const emailLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(userEmail)}`;
    window.open(emailLink);
  }
  



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
          paddingTop: 10,
          background:  "linear-gradient(90deg, rgba(255,232,210,1) 0%, rgba(196,252,240,1) 100%)",
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
            Contact us!
            </Typography>
            
            <TextField
                fullWidth
                type="email"
                id="user-email"
                name="email"
                className="contact-input"
              
                
                placeholder="Email"
                margin="normal"
                variant="outlined"
                sx={{ backgroundColor: "#fff3e9" 
                    }}

            />
          
          
            <Button
              fullWidth
              sx={{
                backgroundColor: "#FF7E36 ",
                marginTop: "3px",
                marginBottom: "3px",
              }}
              variant="contained"   
              size="large"


              type="submit"
              onClick={sendEmail}
            >
             Send Email
            </Button>
           
          </Paper>

      </Box>
      <Footer2/>
      </div>
     </div>
  );
}

export default Contact;
