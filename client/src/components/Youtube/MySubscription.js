import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, } from '@material-ui/core'
import Subscriber from "./Subscriber";
import axios from "axios";
import  Homepage from './Homepage'


const useStyles = makeStyles(theme => ({
    root: {
      margin: "2rem auto"
    },
    list:{
        marginBottom:"1rem"
    }
  }));

  
  

function MySubscription() {
  
    const [mySubs, setMySubs] = useState([])
    const [user, setUser] = useState([])
    const [click, setClick] = useState(false)
    const [videos, setVideos] = useState([])

    useEffect(() => {
       
        axios.get('/api/video/getSubscriptionVideos')
                .then(res=>{
                  setMySubs(res.data.subscribedUser)
                    setVideos(res.data.videos)            
                })
                .catch(err=>{
                    alert("gewhuifwhg")
                })

        
    }, [])

    const handleClick=(user)=>{
        setClick(true)
       
        var a=videos.filter(data=>data.writer._id==user)
        setUser(a)
       
        
    }
    
    const classes=useStyles()
    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item lg={2} >  
                <List>
                   {mySubs.map((data,key)=>
                     <ListItem className={classes.list}>
                        
                        <Button onClick={()=>handleClick(data._id)}  >
                        <ListItemAvatar><Avatar>R</Avatar></ListItemAvatar>
                        <ListItemText primary={data.name}/>
                       
                        </Button>
                        
                        {/* <ListItemSecondaryAction><Subscriber SubsTo={data._id} /></ListItemSecondaryAction> */}
                    </ListItem>
                   )}
                   </List>                
                </Grid>
                <Grid item lg={10} id="4">
                  { <Homepage user={user}/>}
                </Grid>

            </Grid>
            
        </div>
    )
}

export default MySubscription
