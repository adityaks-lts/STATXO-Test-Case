const morgan = require("morgan");

morgan.token("request", (req)=>{
    if(req.method == "PATCH") return "UPDATED";
    else  if(req.method == "POST") return "ADDED";
    else if(req.method == "DELETE") return "DELETED";
    else return "UNKNOWN";
})

morgan.token("id", (req)=>{
    if(req.params){
        const id = req.params.id;
        if(id) return id;
        else return 0;

    }
    return "-"

})

morgan.token("user", (req)=>{
    if(req.user){
        return req.user.userName;
    }
    else return "Unknown";
})

module.exports = morgan;
