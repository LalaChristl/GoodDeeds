import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo from "../images/logo-nav.png";
import { Context } from "./Context";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import MusicPlayer from "./MusicPlayer";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      m: 899,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Barlow, sans-serif",
    fontWeight: 500,
  },
  appBar: {
    backgroundColor: "#018f8c",
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
    color: "white",
    textTransform: "uppercase",
    marginRight: theme.spacing(1),
    fontSize: "14px",
    fontWeight: "bold",
    display: "none",
    "&:hover": {
      color: "black",
      backgroundColor: "#FFA472",
      // fontSize: "16px",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  menuButton: {
    color: "white",
    display: "none",
    "&:hover": {
      color: "black",
      backgroundColor: "#FFA472",
      // fontSize: "16px",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
function Navbar() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const classes = useStyles();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  const handleLogout = async () => {
    const response = await axios.get(baseUrl + "/users/logout", {
      withCredentials: true,
    });
    console.log(":flamingo: ~ handleLogout ~ response", response);
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
            <div className="flex justify-center items-center gap-[10px]">
              <p className="Logo text-[1.5rem]">Good Deeds</p>
              <img className="" src={Logo} alt="" />
            </div>
          </Link>
          <MusicPlayer />
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
            <Button component={Link} to={"/map"} className={classes.link}>
              Map
            </Button>

            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              className={classes.menuButton}
            >
              <MenuIcon />
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                backgroundColor: "#018f8c",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/" className={classes.menuLink}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/aboutus" className={classes.menuLink}>
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/contact" className={classes.menuLink}>
                  Contact
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/map" className={classes.menuLink}>
                  Map
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/login" className={classes.menuLink}>
                  Login
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/map" className={classes.menuLink}>
                  Map
                </Link>
              </MenuItem>{" "}
              */}
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/dashboard/helpeeprofile/getuser2/" + state.user._id}
                  className={classes.menuLink}
                >
                  Dashboard
                </Link>
              </MenuItem>{" "}
              */}
            </Menu>

            {/* <Button component={Link} to="/register" className={classes.link}>
              Register
            </Button> */}

            {state.isAuthenticated ? (
              <Button className={classes.link} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
