import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo3 from "../images/logo-3.png";
import { Context } from "./Context";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#ff7e36",
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
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },
   
  },
  link: {
    color: "white",
    textTransform: "uppercase",
    marginRight: theme.spacing(2),
    fontSize: "14px",
    fontWeight: 'bold',
    "&:hover": {
      color: "black",
      backgroundColor: "#ffa472",
      // fontSize: "16px",
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: "none",
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

            <Button component={Link} to="/dashboard/helpeeprofile/getuser1" className={classes.link}>
              Dashboard
            </Button>

                {state.isAuthenticated ? (
                <Button className={classes.link} onClick={handleLogout}>
                Logout
                </Button> ) 
                : 
                (<>
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
                           >
                <MenuItem onClick={handleClose}>
                  <Link to="/" className={classes.link}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/aboutus" className={classes.link} >
                    About
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/contact" className={classes.link}>
                    Contact
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/map" className={classes.link}>
                    Contact
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Link 
                      to={"/dashboard/helpeeprofile/getuser2/" + state.user._id}
                      className={classes.link}>
                    Dashboard
                  </Link>
                </MenuItem>
              </Menu>

              {state.user._id ? (
              <Button
                  onClick={handleLogout} component={Link} to="/" className={classes.link}>
                    Logout
              </Button>
              ) : (
              <Button
                  onClick={handleLogin} component={Link} to="/login" className={classes.link}>
                    Login
              </Button>
              )}

              <Button component={Link} to="/register" className={classes.link}>
                Register
              </Button>
            </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
 );
}
              
export default Navbar;