const express = require("express");
const connectDB = require("../config/db")
const userRoutes = require("../routes/userRoutes");
const testDataRoutes = require("../routes/testDataRoutes");
const auth = require("../middleware/auth");
const morgan = require("../middleware/logs");
const fs = require("fs");
const path = require('path')
var updateLogStream = fs.createWriteStream(path.join(__dirname, "../logs/morganLogs.txt"), { flags: 'a' })
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT

app.use(express.json());
 
app.use(cors({origin:["https://statxo-test-case.vercel.app"]}))

app.use("/users",userRoutes);
app.use("/data",auth,morgan('{"request": ":request" , "id": ":id" , "data": ":date"}', {skip:(req)=>{
    // console.log(req.method);
    if(req.method == "GET") return true;
    else return false;
}, stream:updateLogStream}),testDataRoutes);
app.get("/",(req, res)=>{
    res.send("<h1>This is homepage of the server</h1>")
})

app.listen(port, async()=>{
    try{
        await connectDB;
        console.log("Server is running on localhost:"+port);
    }
    catch(err){
        console.log(err);
    }
})
