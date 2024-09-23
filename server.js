import express from "express"
import fs from "fs"
import db from "./db.js"
import bodyParser from "body-parser"
import personRoute from "./Routes/personRoute.js"
import menuRoute from "./Routes/menuRoute.js"

const app=express()
app.use(bodyParser.json())
const port=process.env.PORT || 3000


app.use("/person", personRoute)

app.use("/menu",menuRoute)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})