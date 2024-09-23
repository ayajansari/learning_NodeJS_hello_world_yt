import mongoose from "mongoose";

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
        
    },
    age:{
        type:Number,    
    }
})
const Person=mongoose.model("Person",personSchema)
export default Person