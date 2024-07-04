const role = (roles)=>{
    
    return (req, res, next)=>{
        // console.log(req.user, roles);
        if(roles.includes(req.user.role)){
            next()
        }
        else res.sendStatus(401);
    }
}

module.exports = role;