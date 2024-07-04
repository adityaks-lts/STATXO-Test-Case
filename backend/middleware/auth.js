const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next)=>{
    const header = req.headers.authorization; 
    if(header){
        const token = header.split(" ")[1];
        const secret_key = process.env.SECRET_KEY;
        jwt.verify(token, secret_key, (err, decode)=>{
            if(err) res.sendStatus(400);
            else{
                req.user = decode;
                next();
            }
        })

    }
    else res.status(400)
}

module.exports = auth;