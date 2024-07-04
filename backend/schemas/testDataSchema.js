const {Schema, model} = require("mongoose");

const testDataSchema = new Schema({
    quantity:{type:Number, require:true},
    amount:{type:Number, require:true},
    postingYear:{type:Number, require:true},
    postingMonth:{type:String, require:true},
    actionType:{type:String, require:true},
    actionNumber:{type:String, require:true},
    actionName:{type:String, require:true},
    status:{type:String, require:true},
    Impact:{type:String, require:true},
})

const testDataModel = model("testData", testDataSchema);
module.exports = testDataModel;