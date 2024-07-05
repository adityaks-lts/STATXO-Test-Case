const { Router } = require("express");
const fs = require("fs");

loggRoute.get("/",async(req, res)=>{
    try{
        const content = fs.readFileSync("../logs/morgonLogs.txt", 'utf-8');
        res.send(content);

    }
    catch(err){
        res.status(500);
    }

})