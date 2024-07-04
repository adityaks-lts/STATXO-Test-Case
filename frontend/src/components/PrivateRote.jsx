import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export function PrivateRouter({children}){
    const user = JSON.parse(localStorage.getItem("loggedIn")) ;
    const dispatch = useDispatch();
    if(user){
        
        return children;
    } 
    else return <Navigate to="/login"/>
}