import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/action";
import { Form } from "./Form";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { DataTable } from "./Table";
import { useNavigate } from "react-router-dom";
import { Logs } from "./logs";
export function Dashboard(){
    const dispatch = useDispatch();
    const lst = JSON.parse(localStorage.getItem("loggedIn"))
    const DomUpdate = useSelector(state => state.DomUpdate)
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(()=>{
        dispatch(fetchData());
    },[DomUpdate.status])
    
    return(<div>
        <div className="dashboard-header">
        <Heading mx={"auto"} >Dashboard</Heading>
        l<Logs/>
        <Form />
        <Button onClick={()=>{
            navigate("/login");
            toast({
                title: "Signing out",
                status: "info",
                isClosable: true,
                duration:3000
              }) 
            localStorage.removeItem("loggedIn")
        }} >Sign out</Button>
        </div>
        <DataTable/>
    </div> )
}