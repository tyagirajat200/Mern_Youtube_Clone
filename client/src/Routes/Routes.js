
import React, { useEffect, useState } from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import Navbar from '../components/Home/Navbar'
import Register from '../components/Home/Register'
import Login from '../components/Home/Login'
import Home from '../components/Home/Home'
import Postmessage from "../components/Postmessage";

import  DetailVideo  from "../components/Youtube/DetailVideo";
import  Homepage  from "../components/Youtube/Homepage"
import  Upload from "../components/Youtube/Upload"
import MySubscription from "../components/Youtube/MySubscription";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Actions/authentications";

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'



export default function Routes() {
    const[loading ,setLoading]=useState(true)

    const auth = useSelector((state) => {
        return state.auth.isAuthenticated
      })
    const dispatch = useDispatch()
    

    useEffect( ()=>{
         dispatch(setCurrentUser()).then(res=>{
             
                setLoading(false)
            
        })
        console.log("Setting Up Current User")

        // eslint-disable-next-line                 
    },[])

    return (
      loading === true ?<div className="loader"></div> :
        <div>
            <BrowserRouter >
            
                <Navbar />
                
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/video/mySubs"><MySubscription /></Route>
                    <PrivateRoute exact path="/Postmessage" authenticated={auth} component={Postmessage} />
                    <PublicRoute exact path="/login"  authenticated={auth} component={Login}/>
                    <PublicRoute exact path="/register"  authenticated={auth} component={Register}/>
                    <Route exact  path ="/video/upload" authenticated={auth} component={Upload}/>
                    <PrivateRoute exact  path ="/video/:videoId" authenticated={auth} component={DetailVideo} />
                    <PrivateRoute exact  path ="/video" authenticated={auth} component={Homepage}/>
                </Switch>
              
            </BrowserRouter>


        </div>
    )
}
