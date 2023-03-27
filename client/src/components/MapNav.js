import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo from "../images/Good Deeds.png";
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
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <img className="p-1 " src={Logo} alt="" />
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
              to={"/dashboard/helpeeprofile/getuser2/ " + state.user._id}
              className={classes.link}
            >
              Dashboard
            </Button>
            <Button component={Link} to="/login" className={classes.link}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
