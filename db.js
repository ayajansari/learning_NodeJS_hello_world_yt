import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/myDB")
.then(()=> console.log("Connected!"))
.catch((e)=> console.log(e))

const db=mongoose.connection;
export default db;