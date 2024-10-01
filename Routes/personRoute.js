import express from "express"
import Person from "../models/Person.js";

const router=express.Router();

//GET method to get person data
router.get("/",async(req,res)=>{
    
    try {
        
        const data=await Person.find();
        // data.forEach(d=> console.log("name: "+d.name + " age: "+d.age)) 
        res.send(data)
        return data;
        
    } catch (e) {
        console.log("error occured, ",e);
    }
    res.send("error")

})

//POST method to add person data
router.post("/",async (req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data);

        await newPerson.save()
        console.log("person data saved!")
    }catch(e){
        if(e.code==11000)   console.log("duplicate key error");
        console.log("error occured: ",e)
    }
    
    res.send("saved!")
})


//GET method to get person with workType
router.get("/:workType", async(req,res)=>{

    try{

        const workType=req.params.workType;
        if(workType=="development" || workType=="support" || workType=="management" ){
            const response=await Person.find({work:workType})
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