const { Router } = require("express");
const testDataModel = require("../schemas/testDataSchema")
const testDataRoutes = Router();
const role = require("../middleware/role")

testDataRoutes.get("/", role(["admin", "user"]), async(req, res)=>{
    try{
        const data = await testDataModel.find();
        res.send({data:data.reverse()});
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

testDataRoutes.patch("/:id", role(["admin","user"]),async(req,res)=>{
    try{
        const id = req.params.id;
        if(req.body.status == undefined){
            const found = await testDataModel.find({_id:id});
            if(found.length > 0){

                const {quantity,amount,postingYear, postingMonth,actionType,actionNumber,actionName,Impact, status} = found[0];
                const deletedData = await testDataModel.deleteOne({_id:id});
                const newData = new testDataModel({quantity,amount,postingYear, postingMonth,actionType,actionNumber,actionName,Impact, status, ...req.body})
                newData.save();
                if( deletedData.deletedCount == 1) res.status(200).json({message:"Updated Successfully"});
                else res.sendStatus(204);
            }
            else res.sendStatus(404)
        }
        else res.sendStatus(401);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})

testDataRoutes.patch("/admin/:id", role(["admin"]),async(req,res)=>{
    try{
        const id = req.params.id;
        if(req.body.status){
            const found = await testDataModel.find({_id:id});
            if(found.length > 0){

                const {quantity,amount,postingYear, postingMonth,actionType,actionNumber,actionName,Impact} = found[0];
                const deletedData = await testDataModel.deleteOne({_id:id});
                const newData = new testDataModel({quantity,amount,postingYear, postingMonth,actionType,actionNumber,actionName,Impact, status:req.body.status})
                newData.save();
                if( deletedData.deletedCount == 1) res.status(200).json({message:"Updated Successfully"});
                else res.sendStatus(204);
            }
            else res.sendStatus(404);
        }
        else res.sendStatus(500);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})

testDataRoutes.delete("/:id", role(["admin"]),async(req,res)=>{
    try{
        const id = req.params.id;
        if(req.body.status){
            const data = await testDataModel.deleteOne({_id:id});
            if(data.acknowledged && data.deletedCount == 1) res.status(200).json({message:"Deleted Successfully"});
            else res.sendStatus(204);
        }
        else res.sendStatus(500);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})

module.exports = testDataRoutes;