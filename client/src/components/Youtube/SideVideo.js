import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,  Card } from "@material-ui/core/";
import axios from 'axios'
import { Link} from "react-router-dom";



const useStyles = makeStyles(theme => ({}));

export default function TitlebarGridList() {
  const [Videos, setSideVideos] = useState([])

  useEffect(() => {
    axios.get('/api/video/getAllVideos')
        .then(response => {   

                setSideVideos(response.data.videos)   
        })
        .catch(err=>{

          alert('Failed to get Videos')
          
        })
}, [])

  const classes = useStyles();
  var minutes =""
  var seconds = ""

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {Videos.map((video,key )=> {

             
           { minutes = Math.floor(video.duration / 60)}
           { seconds = Math.floor(video.duration - minutes * 60)}

       return  <Card key={key}
            style={{ display: "flex", marginTop: "1rem", padding: "0 2rem" }}
          >
            <div style={{ width: "45%", marginRight: "1rem" }}>
              <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
                <img style={{ width: "100%" }} src={`http://localhost:4000/${video.thumbnail}`} alt="thumbnail" />
              </Link>
            </div>

            <div style={{ width: "40%" }}>
              <a href="#" style={{ color: "gray" }}>
                <span style={{ fontSize: "1rem", color: "black" }}>
                  {video.title}{" "}
                </span>
                <br />
                <span>{video.writer.name}</span>
                <br />
                <span>{video.views} views</span>
                <br />
                <span>
                  {minutes} : {seconds}
                </span>
                <br />
              </a>
            </div>
          </Card>
})}
      </Grid>
    </div>
  );
}
