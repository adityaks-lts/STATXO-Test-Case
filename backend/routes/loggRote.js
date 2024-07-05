const { Router } = require("express");
const fs = require("fs");
const path = require("path")
const loggRote= Router();
const logFilePath = path.join(__dirname, "../logs/morganLogs.txt");
loggRote.get("/",async(req, res)=>{
    try{
        fs.readFile(logFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the log file:', err);
                return;
            }
            res.send(data)});

    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }

})

module.exports = loggRote;