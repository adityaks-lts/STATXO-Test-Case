const express = require("express");
const connectDB = require("../config/db")
const userRoutes = require("../routes/userRoutes");
const testDataRoutes = require("../routes/testDataRoutes");
const auth = require("../middleware/auth");

// const auth = require("./middleware/auth");
const app = express();
require("dotenv").config();

const port = process.env.PORT

app.use(express.json());
app.use("/users",userRoutes);
app.use("/data",auth,testDataRoutes);
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
