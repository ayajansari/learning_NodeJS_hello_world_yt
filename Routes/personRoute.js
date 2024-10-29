import express from "express"
import Person from "../models/Person.js";
import bcrypt from "bcrypt"
import { generateToken,jwtAuthMiddleware } from "../jwt.js";

const router=express.Router();

//GET method to get person data and this will be authenticated route
router.get("/",jwtAuthMiddleware,async(req,res)=>{
    
    try {
        
        const data=await Person.find({},{password:0});  //get all person data but password 
        //of other users will not be visible for security purpose so added projection
        res.send(data)
        
    } catch (e) {
        res.status(500).json({error:e})
    }
    
})

//POST method to add person data
router.post("/signup",async (req,res)=>{
    try{
        
        const data=req.body
        const newPerson=new Person(data);
        await newPerson.save()
        console.log("SignUp Successfull !")
        res.status(200).json({response:"SignUp Successfull !"})
    }catch(e){
        
        res.status(401).json({message:"duplicate username error"})
    }   
})

//route to make user login and create new token if not already or use previously created
router.post("/login", async(req,res)=>{

    const {username,password}=req.body;

    try{
        const user=await Person.findOne({username:username});
        if(!user ){
            
            return res.status(401).json({error:"invalid username or password 1"});
        }

        //check password 
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return  res.status(401).json({error:"invalid username or password 2"});
        }
        
        
        //generate token 
        const payload={     //Note: payload is decode easily therefore it should not contain password 
            id:user.id,
            username:user.username,
            name:user.name
        }
        const token=generateToken(payload);
        res.status(200).json({token:token});
    }catch(e){
        return res.status(400).json({error:"Internal Server Error"});
    }
})

router.get("/userProfile",jwtAuthMiddleware, async(req,res)=>{

    
    try {
        const userData=req.user; //user data is getting from jwt token after decoding
        console.log("userData : ",userData);
        const userId=userData.id;
        const user=await Person.findById(userId);
        res.status(200).json({userProfile:user});
        
    } catch (e) {
        res.status(401).json({error:e})
    }
})


//GET method to get person with workType
router.get("/:workType", async(req,res)=>{

    try{

        const workType=req.params.workType;
        if(workType=="development" || workType=="support" || workType=="management" ){
            const response=await Person.find({work:workType},{password:0})
            res.status(200).json(response)
        }else{
            res.send("invalid workType")
        }
    }catch(e){
        res.status(500).json( {e:"\n internal server error" } );
    }
    
})

//PUT route to udpate the person records

router.put("/:id", async(req,res)=>{

    const personId=req.params.id;
    const updatedValue=req.body;    //updatedValue will json data containing updated values like { "name":"aaa","age":24}
    try{
        const response=await Person.findByIdAndUpdate(personId,updatedValue,{
            new:true,   //returns update document
            runValidators:true //runs mongoose validators like required:true,unique:true
        })
        //mongoose will convert above line like Person.findByIdandUpdate(personId,{$set:{name:"person-name",age:"age-value"}})
        //to know about all functions refer to mongoosejs.com/docs/api/model

        if(!response){
            res.send("internal server error");
        }
        res.send(response);
    }catch(e){
        res.send("person not found")
    }
})

//DELETE route delete person record

router.delete("/:id", async(req,res)=>{

    const personId=req.params.id;
    try {
        
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.send("person not found")
        }
        console.log(response)
        res.send("person deleted successfully!");

    } catch (e) {
        console.log(e)
    }
})

const personRoute=router;
export default personRoute;