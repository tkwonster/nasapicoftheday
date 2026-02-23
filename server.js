//Backend

//reads .env so we can use process.env.NASA_API_KEY to access the NASA API key
require("dotenv").config();
const express=require("express");

//creating express app/server   
const app=express();
const PORT=3000;

//if someone visits server, look inside public folder (/, /app.js)
//middleware- runs on every request before any specific route handlers (e.g. app.get("/api/apod"))
app.use(express.static("public")); 

//check for NASA API key on server startup, else throw error and exit
const API_KEY=process.env.NASA_API_KEY;
if(!API_KEY){
  console.error("Missing NASA_API_KEY in .env");
  process.exit(1);
}

//creating get route
app.get("/api/apod",async(req,res)=>{
    try{
        //1. call nasa api
        const data=await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        //if nasa api returns error, forward that error to client
        if(!data.ok)return res.status(data.status).send(await data.text());
        //2. forward nasa api response (data) to client
        res.json(await data.json());
    //3. if any error happens in this process, catch it and send error message to client
    }catch(e){
        res.status(500).json({error:String(e)});
    }
});

//start server on port 3000, and log url to console
app.listen(PORT,()=>console.log(`Launched at: http://localhost:${PORT}`));