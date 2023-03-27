import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo3 from "../images/logo-3.png";
import { Context } from "./Context";
import { useContext } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#FF8E25",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
  logo: {
    marginRight: theme.spacing(2),
    height: "50px",
  },
  linkContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  link: {
    color: "#0D2237",
    textTransform: "uppercase",
    marginRight: theme.spacing(2),
    "&:hover": {
      color: "#303f9f",
      backgroundColor: "transparent",
      fontSize: "1rem",
    },
  },
}));
function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

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
  const handleLogout = async () => {
    const response = await axios.get("http://localhost:5000/users/logout");
    console.log("🦩 ~ handleLogout ~ response", response);

    dispatch({
      type: "logout",
    });

    navigate("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            {/* <img className="p-1 " src={Logo} alt="" /> */}
            <div className="flex justify-center items-center gap-[10px]">
              <p className="Logo text-[1.5rem]">Good Deeds</p>

              <img className="" src={Logo3} alt="" />
            </div>
          </Link>
          <div className={classes.linkContainer}>
            <Button component={Link} to="/" className={classes.link}>
              Home
            </Button>
            <Button component={Link} to="/aboutus" className={classes.link}>
              About
            </Button>
            <Button component={Link} to="/contact" className={classes.link}>
              Contact
            </Button>
            <Button
              component={Link}
              to={"/dashboard/helpeeprofile/getuser2/" + state.user._id}
              className={classes.link}
            >
              Dashboard
            </Button>
            <Button component={Link} to="/map" className={classes.link}>
              Map
            </Button>
            {state.user._id ? (
              <Button
                onClick={handleLogout}
                component={Link}
                to="/"
                className={classes.link}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                component={Link}
                to="/login"
                className={classes.link}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
