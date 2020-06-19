import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Avatar, ListItem, ListItemText, Typography, List, ListItemSecondaryAction } from "@material-ui/core";
import SideVideo from "./SideVideo";
import axios from 'axios'
import moment from 'moment'
import Subscriber from'./Subscriber'
import LikeDislike from './LIkeDislike'
import Comment from './Comment'

const useStyles = makeStyles(theme => ({
  root: {
    margin: "1rem auto"
  }
}));

export default function DetailVideo(props) {
  const videoId = props.match.params.videoId

  
  const [video, setVideo] = useState("")

  useEffect(() => {
   
    axios.post('/api/video/getVideo', { videoId })
      .then(response => {
        if (response.data.success) {
         console.log(response.data.video);
         
          setVideo(response.data.video)
        } else {
          alert('Failed to get video Info')
        }
      })

  }, [videoId])
  


  const classes = useStyles();
  if (video.writer) {
  return (
    <React.Fragment>
      
      <Grid container className={classes.root} justify="space-evenly" >
        <Grid item lg={8} xs={12}>
          <Paper>

            <video
              width="100%"
              autoPlay
              style={{
                maxHeight: "500px",
                backgroundColor: "black",
              }}
              loop
              src={`http://localhost:4000/${video.filePath}`}
              controls
            >

              Your browser does not support the video tag.
            </video>
         
            <Typography variant="h5" component="h2">{video.title} </Typography>

            <span> {video.views} views - </span>
            <span>{moment(video.date).format("Do-MMM-YYYY")} </span>
            <List>
            <ListItemSecondaryAction>
            <LikeDislike video={video}/>
            </ListItemSecondaryAction>
            </List>
           
          
            <hr/>
            
            <List>
              <ListItem style={{padding:"0"}}>
                <Avatar>R</Avatar>
                <ListItemText primary={<Typography variant="h5" component="h2">{video.writer.name} </Typography>}/>
                <ListItemSecondaryAction><Subscriber SubsTo={video.writer._id}/></ListItemSecondaryAction>
              </ListItem>
            </List>
            <hr/>
              <Comment video={video}/>
          </Paper>
        </Grid>

        <Grid item lg={3} xs={12}>
          <SideVideo />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
else 
{
  return <React.Fragment>d</React.Fragment>
}

}
