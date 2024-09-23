import express from "express";
import MenuItem from "../models/MenuItem.js";
const router=express.Router();

//GET method to get menu list
router.get("/", async(req,res)=>{

    try {
        
        const data=await MenuItem.find();
        res.send(data)
        return ;
        
    } catch (e) {
        console.log("error occured, ",e);
    }
    res.send("error")
})

//POST method to add menu
router.post("/",async(req,res)=>{
    try{

        const data=req.body;
        const newItem=new MenuItem(data);
        await newItem.save();
        console.log("menu added!")
        res.send("success!")
        return 
    }catch(e){
        console.log("error occured-",e)
    }
    res.send("error")
})

//GET method to list menu according to types
router.get("/:menuType", async(req,res)=>{

    const menuType=req.params.menuType;
    if(menuType=="sweet" || menuType=="sour" || menuType=="spicy"){
        try {
            const data=await MenuItem.find({taste:menuType});
            res.send(data);
            
        } catch (e) {
            res.send(e)
        }

    }else{
        res.send("menu type invalid")
    }
})

//PUT method to find and update the menuItem
router.put("/:id", async(req,res)=>{

    const menuId=req.params.id;
    const updatedMenu=req.body;
    try {
        
        const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenu,{
            new:true,
            runValidators:true,
        })
        if(!response){
           return  res.send("interval server error");
        }
        res.send(response)

    } catch (e) {
        res.send("menu not found");
    }
})

router.delete("/:id", async(req,res)=>{

    try{
        const menuId=req.params.id;
        await MenuItem.findByIdAndDelete(menuId);
        
        res.send("menu deleted Successfully")
    }
    catch(e){
        res.send("internal server error")
    }
})

const menuRoute=router;
export default menuRoute;