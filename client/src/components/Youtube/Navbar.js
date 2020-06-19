import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import YouTubeIcon from "@material-ui/icons/YouTube";


import { Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  button: {
    marginRight: "8px",
    padding: 0
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.button}>
            <YouTubeIcon fontSize="large" style={{ color: "red" }} />
          </IconButton>

          <Button color="inherit" className={classes.button}>
            <Link variant="h6" underline="none">
              Video
            </Link>
          </Button>

          <Button href="#" color="inherit" className={classes.button}>
            <Link variant="h6" underline="none">
              Subscription
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      
    </div>
  );
}
