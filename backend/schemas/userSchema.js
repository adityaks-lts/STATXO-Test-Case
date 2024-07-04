const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    userName:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    role:{type:String,enum:["user", "admin"], default:"user"},
});

const userModel = model("user", userSchema);
module.exports = userModel;