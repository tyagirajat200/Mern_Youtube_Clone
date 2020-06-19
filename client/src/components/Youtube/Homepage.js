import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, makeStyles } from "@material-ui/core/";
import axios from "axios";
import moment from 'moment'
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    width: "70%",
    margin: "2rem auto",

  }
}));

export default function Homepage(props) {

  const [Videos, setVideos] = useState([])


  

  useEffect(() => {

    if(props.user)
    {
      setVideos(props.user)
    }
    else{
      axios.get('/api/video/getAllVideos')
      .then(response => {
        setVideos(response.data.videos)        
      })
      .catch(err=>{
        alert('Failed to get Videos')
      })
    }
  }, [props.user])


  const classes = useStyles();
  var minutes =""
  var seconds = ""
  return (
    <div className={classes.root}>
      {props.user ? null :  <Typography variant="h5">Recommended </Typography> }
     
      <hr />


      <Grid container spacing={5}>
        {Videos.map(video => {
  { minutes = Math.floor(video.duration / 60)}
  { seconds = Math.floor(video.duration - minutes * 60)}
        return <React.Fragment>
        
          <Grid className={classes.grid1} item lg={3} sm={6} xs={12} >
            <Card>
              <div style={{ position: "relative" }}>
                <Link to={`/video/${video._id}`}>
                <img src={`http://localhost:4000/${video.thumbnail}`} alt="f" style={{ width: "100%" }} />
                <div
                  style={{
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    margin: "0.4rem",
                    color: "white",
                    backgroundColor: "black",
                    padding: "3px 6px",
                    fontSize: "12px"
                  }}
                >
                  <span>{minutes}:{seconds}</span>
                </div>
                </Link>
              </div>
              <Typography variant="h5" component="h2">
                {video.title}
              </Typography>
              <span>By: {video.writer.name}</span>
              <br/>
              <span style={{ marginRight: "1rem" }}> {video.views} views</span>-{" "}
              <span>{moment(video.date).format("MMM YY")} </span>
            </Card>
          </Grid>
          </React.Fragment>
                })}
       
      </Grid>
    </div>
  );
}
