import "./App.css";
// import { Link } from "react-router-dom";
// import Logo from "./images/Good Deeds.png";

import { RiMentalHealthLine } from "react-icons/ri";
import { GiInnerSelf } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
import Hero from "./images/homepage-hero.jpg";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import { IoIosPeople } from "react-icons/io";

import { TbBorderRadius, TbHeartHandshake } from "react-icons/tb";
import { FaHands } from "react-icons/fa";
import Footer2 from "./components/Footer2";
import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "./components/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Paper, Typography, TextField } from "@mui/material";
import { GrWifiNone } from "react-icons/gr";

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
    filter: "brightness(50%)",
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
  input: {
    color: "white",
    textTransform: "uppercase",
    marginRight: theme.spacing(2),
    fontSize: "14px",
    fontWeight: "bold",

    "&:hover": {
      color: "black",
    },
  },
}));

function App() {
  const [filter, setFilter] = useState({ task: "" });
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  // const handleResetFilter = () => {
  //   setFilter({ task: "" });
  // };

  const handleApplyFilter = useCallback(async () => {
    try {
      const response = await axios.post("/tasks/search", filter);
      console.log("(🇯🇲 handleApplyFilter listTasks", response);
      if (response.data.success) {
        dispatch({ type: "listTask", payload: response.data.task });
        navigate("/listtasks");
      }
    } catch (error) {
      console.error(error);
      alert("There is no request that match");
      // handle the error here
    }
  }, [filter, dispatch, navigate]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleApplyFilter();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleApplyFilter]);

  const classes = useStyles();

  return (
    <>
    <Navbar />
    <Box
        sx={{
          height: "vh",
          display: "flex",
        
          maxWidth: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 30,
          background: "linear-gradient(90deg, rgba(0,82,70,1) 0%, rgba(196,252,240,1) 100%)",
          color: "black",
        }}
    >
  
        <Box className={classes.header}>
            <img className={classes.heroImage} src={Hero} alt="" />
            <Box className={classes.heroContent}>
              <Typography variant="h3" className={classes.heroTitle}>
                Join the Movement for Positive Social Change:
              </Typography>
              <Typography variant="h3" className={classes.heroTitle}>
                Volunteer today!
              </Typography>
            </Box>
          </Box>
          {/*Searchbar  */}
          <Paper
            sx={{
              display: "flex",
              gap: 5,

              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              mt: 12,
              mb: 18,
              maxWidth: 460,
              backgroundColor: "#fff2ea",
              opacity: [1, 1, 1],
              boxShadow: 5,
            }}
          >
            <section className="homepage-search-bar">
              <Typography
                variant="h4"
                align="center"
                p={5}
                sx={{
                  backgroundColor: "#ff7e36",
                  color: "black",
                  boxShadow: 5,
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
              >
                Do you want to help out?
              </Typography>
              <div className="home-search-bar">
                <TextField
                  sx={{
                    width: "300px",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                  }}
                  className={classes.input}
                  variant="standard"
                  align="center"
                  placeholder="search for tasks in your area"
                  type="text"
                  id="base-input"
                  onChange={(e) =>
                    setFilter({ ...filter, task: e.target.value })
                  }
                  value={filter.task}
                />
              </div>
            </section>
          </Paper>

          <Paper
            sx={{
              pt: 10,
              mt: 12,
              mb: 12,
              maxWidth: 2560,
              width: "100%",
              backgroundColor: "#ffa472 ",
              // background: "linear-gradient(90deg, rgba(196,252,240,1) 13%, rgba(255,254,254,1) 100%)",
              opacity: [1, 1, 1],
              boxShadow: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <section>
              <div className="benefits-container">
                <h3 className="benefits-h3">Benefits of Helping Others</h3>
                <div className="benefits-card-container">
                  <Paper
                    sx={{
                      p: 4,
                      mt: 8,
                      mb: 12,
                      maxWidth: 460,
                      backgroundColor: "#fff2ea",
                      opacity: [1, 1, 1],
                      boxShadow: 10,
                    }}
                  >
                    <div className="benefits-card">
                      <RiMentalHealthLine className="benefits-icon text-red-600" />

                      <p className="benefits-p-header">
                        Improves Physical and Mental Health
                      </p>

                      <p className="benefits-p">
                        Volunteering reduces stress and increases positive,
                        relaxed feelings by releasing dopamine. By spending time
                        in service to others, volunteers report feeling a sense
                        of meaning and appreciation, both given and received,
                        which can have a stress-reducing effect.
                      </p>
                    </div>
                  </Paper>

                  <Paper
                    sx={{
                      p: 4,
                      mt: 8,
                      mb: 12,
                      maxWidth: 460,
                      backgroundColor: "#fff2ea",
                      opacity: [1, 1, 1],
                      boxShadow: 10,
                    }}
                  >
                    <div className="benefits-card">
                      <GiInnerSelf className="benefits-icon text-blue-500" />

                      <p className="benefits-p-header">
                        Provides a Sense of Purpose
                      </p>

                      <p className="benefits-p">
                        The work that volunteers provide is essential to
                        everyday activities, which gives volunteers a sense of
                        purpose, especially when volunteering in the areas they
                        find meaningful. Older volunteers experience greater
                        increases in life satisfaction and self-esteem.
                      </p>
                    </div>
                  </Paper>

                  <Paper
                    sx={{
                      p: 4,
                      mt: 8,
                      mb: 12,
                      maxWidth: 460,
                      backgroundColor: "#fff2ea",
                      opacity: [1, 1, 1],
                      boxShadow: 10,
                    }}
                  >
                    <div className="benefits-card">
                      <GiThreeFriends className="benefits-icon text-purple-500" />

                      <p className="benefits-p-header">
                        Nurture New and Existing Relationships
                      </p>

                      <p className="benefits-p">
                        Volunteering increases social interaction and helps
                        build a support system based on common interests. One of
                        the best ways to make new friends and strengthen
                        existing relationships is to participate in a shared
                        activity.
                      </p>
                    </div>
                  </Paper>
                </div>
              </div>
            </section>
          </Paper>

          <Typography
            sx={{
              p: 4,
              mt: 15,
              mb: 15,
            }}
          >
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
              pt: 10,
              mb: 12,
              mt: 15,
              maxWidth: 2560,
              backgroundColor: "#ffa472 ",
              // background: "linear-gradient(90deg, rgba(196,252,240,1) 13%, rgba(255,254,254,1) 100%)",
              opacity: [1, 1, 1],
              boxShadow: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>   
        <section className="h-[500px]">
          <Carousel />
        </section>
     


        
        <section>
          <div className="about-us-container">
            <h3 className="about-us-h3">Who We Are</h3>
            <p className="about-us-p">
              Welcome to Good Deeds, a community volunteer organisation
              dedicated to connecting people and making a positive impact in
              your local area. Our organisation was founded on the belief that
              everyone has the power to make a difference and that small acts of
              kindness can have a big impact. We aim to bring people together
              and create a sense of community through volunteering and giving
              back. At Good Deeds, we offer a range of volunteer opportunities
              that cater to different interests and skillsets. Whether you're
              passionate about the environment, social justice, or helping those
              in need, we have a role for you. We believe that volunteering
              should be accessible to everyone, which is why we offer flexible
              hours and a supportive community to help you get started. Our
              volunteers are the heart and soul of our organisation, and we
              value their time and dedication. We aim to create a positive and
              inclusive environment where everyone feels welcome and valued. We
              believe that through our collective efforts, we can create a
              stronger and more connected community. Join us today and become a
              part of something bigger. Together, we can make a difference and
              create a brighter future for all.
            </p>
          </div>
        </section>
        <section>
          <div className="home-icons-section flex gap-[300px] justify-center pt-[30px] pb-[30px]">
            <div className="flex justify-center items-center flex-col">
              <IoIosPeople className="h-[75px] w-[75px]" />
              <p>Connect</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <TbHeartHandshake className="h-[75px] w-[75px]" />
              <p>Engage</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <FaHands className="h-[75px] w-[75px]" />
              <p>Empower</p>
            </div>
          </div>
        </section>
        </Paper>
     
       

      </Box>
      <Footer2/>
      </div>
     </div>
    
  );
}

export default App;
