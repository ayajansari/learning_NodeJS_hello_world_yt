import bcrypt from "bcrypt"
import mongoose from "mongoose";

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,       
        
    },
    age:{
        type:Number,    
    },
    username:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    }
})


//this is pre-middleware function which will be executed just before save operation on Person schema/db.

personSchema.pre('save',async function(next){

    console.log("yes working POST method")
    const person= this; //this->current person data to be added 

    try{
        const salt=await bcrypt.genSalt(10);    //use salt to encryption
        const hashedPassword=await bcrypt.hash(person.password,salt);
        person.password=hashedPassword; //before saving person data in db convert to hashed Pass.
        next();
    }catch(e){
        return next(e);
    }
})

//pre-middleware function executed just before findOneAndUpdate() function executes
personSchema.pre('findOneAndUpdate',async function(next){

    console.log("yes working PUT method")
    const update = this.getUpdate(); //current updated value provided by user
    const saltRounds = 10;
    update.password = await bcrypt.hash(update.password, saltRounds);   //create hashed password then update
    next();
    
})


const Person=mongoose.model("Person",personSchema)
export default Person