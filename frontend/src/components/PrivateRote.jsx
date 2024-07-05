import { Navigate } from "react-router-dom";

export function PrivateRouter({children}){
    const user = JSON.parse(localStorage.getItem("loggedIn")) ;
    if(user){
        
        return children;
    } 
    else return <Navigate to="/login"/>
}