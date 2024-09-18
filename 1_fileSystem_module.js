import fs from "fs"

/*

write in file
synchronous 
fs.writeFileSync("./1_text.txt","Hello ayaj synchornous"); //create file and add data to it

asynchronous  , both do same task
fs.writeFile("./text.txt","hello ayaj asynchronous", (e)=>{
    if(e){
    
    }
    else{
    }
})

*/
/*

read file
synchronous way
const rs=fs.readFileSync('./1_sample_data.txt',"utf8");     //params:file_name,encoding
console.log(rs) //content of 1_sample_data.txt file

asynchronous way
fs.readFile("./1_sample_data.txt","utf-8",(err,rs)=>{
    if(err){
        console.log("Error: ",err)
    }else{
        console.log(rs)
    }
})

/*

synchronous calls vs asynchronous calls
1] synchronous- fs.fun_call returns o/p wheather it is data/ error
asynchronous- fs.fun_call does not return o/p instead it takes callback
params: err,result of fun_call.

2] for synchronous calls, the execution is blocking i.e line 5  will only be executed
after line 4.
for asynchronous calls, the execution is non blocking i.e if line 5 taking more time then 
execute line 6 , just like in asynchronous functions

*/
/*

append file

// fs.appendFileSync("./1_sample_data.txt"," \ntoday");    //add data to file synchronous way

fs.appendFile("./1_sample_data.txt","\ntomorrow",(e)=>{     //add data to file asynchronous way
    if(e){
        console.log(e)
    }else{
        console.log("data appended successfully")
    }
})

*/

//copy file  (source_copy_from,dest_copy_to)
// fs.copyFileSync('./1_sample_data.txt','./1_text.txt')

//delete file
// fs.unlinkSync("./1_text.txt")

// statistics
// console.log(fs.statSync("./1_text.txt"))
// console.log(fs.statSync("./1_text.txt").isFile())

//create new folder
// fs.mkdirSync("newFolder")

//create folder within folder recursively
// fs.mkdirSync("newFolders/a/b/c",{recursive:true})