const { Router } = require("express")
const userModel = require("../schemas/userSchema")
const bcrypt = require("bcrypt");
const  jwt  = require("jsonwebtoken");
const userRoutes = Router()
require("dotenv").config();

// For sign up
userRoutes.post("/",async (req,res)=>{
	try{
        var userData = req.body;
		const foundUser = await userModel.find({$or: [{email:req.body.email, userName:req.body.userName}]});
		console.log(foundUser)
		if(foundUser.length == 0){

			bcrypt.hash(userData.password, 8, async (err, hash)=>{
				const user = new userModel({...userData,password:hash});
				await user.save();
				res.sendStatus(201)
			})
		}
		else{
			res.status(400).json({message:"Email or Username is already registered"})
		}
	}catch(err){
		console.log(err)
		res.sendStatus(401)
	}
})

// For login
userRoutes.get("/:userName/:password",async (req,res)=>{
	const {userName,password}=req.params
	try{
		// console.log(req.params);
		const user=await userModel.find({userName})
		if(user.length>0){
			bcrypt.compare(password, user[0].password, (err, result)=>{
				if(result){
					const secret_key = process.env.SECRET_KEY;
					const token = jwt.sign({userName:user[0].userName, id:user[0]._id, role:user[0].role},secret_key,(err, token)=>{
						if(err) res.sendStatus(500);
						else{
							res.status(200).json({role:user[0].role,accessToken:token});
						}
					})
				}
				else{res.status(400).send("Wrong Password")}
			})
		} else {
			res.status(400).send("Login Failed")
		}
	} catch(err){
		res.sendStatus(500)
		console.log(err)
	}
})



module.exports = userRoutes;
