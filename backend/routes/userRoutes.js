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
userRoutes.get("/",async (req,res)=>{
	const {email,password}=req.body
	try{
		const user=await userModel.find({email})
		if(user.length>0){
			bcrypt.compare(password, user[0].password, (err, result)=>{
				if(result){
					const secret_key = process.env.SECRET_KEY;
					const token = jwt.sign({email:user[0].email, id:user[0]._id, role:user[0].role},secret_key,(err, token)=>{
						if(err) console.log(err);
						else{
							res.status(200).json({accessToken:token});
						}
					})
				}
				else{res.send("Wrong Password")}
			})
		} else {
			res.send("Login Failed")
		}
	} catch(err){
		res.sendStatus(500)
		console.log(err)
	}
})



module.exports = userRoutes;
