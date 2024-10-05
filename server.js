import express from "express"
import fs from "fs"
import db from "./db.js"
import bodyParser from "body-parser"
import personRoute from "./Routes/personRoute.js"
import menuRoute from "./Routes/menuRoute.js"
import passport from "./Auth.js"



const app=express()
const port=process.env.PORT || 3000
app.use(bodyParser.json())


/*
user defined middleware function

//how to use our own middleware function  to get which route is requested by user

const logRequest=(req,res,next)=>{      // this will display which route is requested
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}` )
    next(); //move to next phase of execution (task of MW is done) i.e. execute code written for perticular routes
    //if next() is not used then whenever any route is called then above console.log line will be executed
    //but code written for that route will not executed.
    
}

//we can use above function to be called whenever "/" route hits just like below
// app.get("/",logRequest,(req,res)=>{
//     res.send("welcome to my website")    
// })
//OR
app.use(logRequest);    //if we want to add logRequest functionality to every route
//then use it like middleware
//NOTE-: middle function and use should be on top in server.js file i.e. before the routes definition
//middleware is executed first then code for that perticular route.

*/

//authentication using passport

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});


app.get("/",localAuthMiddleware,(req,res)=>{
    res.send("welcome to my website")
})


app.use("/person",localAuthMiddleware, personRoute)

//after applying localAuthMiddleware to /person route now all routes
//after /person../.. will require authentication details to proceed further.
//everytime user needs to pass the username and password along with necessary data.
//i.e in case of POST method for person addition .



app.use("/menu",menuRoute)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})