import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#e5e4e9',
    padding: theme.spacing(2),
    marginTop: 'auto',
    width: "100%"
  },
  link: {
    color: '#582ff5',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} My App Name
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Built with React and Material-UI
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href="#" className={classes.link}>Privacy Policy</Link> | <Link href="#" className={classes.link}>Terms of Service</Link>
      </Typography>
    </footer>
  );
}

export default Footer;