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

//Pre-middleware functions->these functions are executed just before making and operation
//to database like save() operation or findAndUpdate() etc.

//before saving any person data , convert the user password into hashed password.
personSchema.pre('save',async function(next){

    console.log("yes working POST method")
    const person= this; //this->current person data provided 

    // POST method to add new person details is called 
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(person.password,salt);
        person.password=hashedPassword; //before saving person data in db convert to hashed Pass.
        next();
    }catch(e){
        return next(e);
    }
})

//convert password into hashed one.
personSchema.pre('findOneAndUpdate',async function(next){

    console.log("yes working PUT method")
    const update = this.getUpdate();

    const saltRounds = 10;
    update.password = await bcrypt.hash(update.password, saltRounds);

    next();
    
})


const Person=mongoose.model("Person",personSchema)
export default Person