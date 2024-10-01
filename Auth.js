import passport from "passport";
import LocalStrategy from "passport-local"
import Person from "./models/Person.js";


//using username and password is local strategy
passport.use(new LocalStrategy( async(username,password,done)=>{
    try{
        console.log("received credentials : ",username," ",password);
        const user=await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:"Incorrect username."});

        }
        const isPasswordMatch=user.password === password? true:false;
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:"Incorrect Password."});

        }

    }catch(e){
        return done(e);
    }
}))

export default passport;