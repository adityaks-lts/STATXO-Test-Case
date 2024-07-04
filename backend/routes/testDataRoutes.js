const { Router } = require("express");
const testDataModel = require("../schemas/testDataSchema")
const testDataRoutes = Router();
const role = require("../middleware/role")

testDataRoutes.get("/", role(["admin", "user"]), async(req, res)=>{
    try{
        const data = await testDataModel.find();
        res.send({data})
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
});

testDataRoutes.post("/", role(["admin", "user"]), async(req,res)=>{
    try{
        const role = req.role;
        const newData =  new testDataModel(req.body);
        await newData.save();
        res.sendStatus(201);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})

testDataRoutes.patch("/:id", role(["admin"]),async(req,res)=>{
    try{
        const role = req.role;
        console.log(req.params)
        const data = await testDataModel.find();
        res.send({data})
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})

module.exports = testDataRoutes;