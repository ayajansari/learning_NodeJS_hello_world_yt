import mongoose from "mongoose";

const menuSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingredients:{
        type:[String],
        default:[],
    }
})

const MenuItem=mongoose.model('MenuItem',menuSchema)
export default MenuItem