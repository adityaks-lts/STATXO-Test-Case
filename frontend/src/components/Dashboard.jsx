import { Heading, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/action";
import { Form } from "./Form";

export function Dashboard(){
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("hello");
        dispatch(fetchData());
    },[])
    const data = useSelector(state => state.data);
    useEffect(()=>{
        console.log(data);

    },[data])
    return(<div>
        <Heading>Dashboard</Heading>
        <div>
        <Form/>
        </div>
        <div>
        <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th isNumeric>ID</Th>
        <Th isNumeric>Quantity</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Posting Year</Th>
        <Th>Posting Month</Th>
        <Th>Action Type</Th>
        <Th>Action Number</Th>
        <Th>Action Name</Th>
        <Th>Status</Th>
        <Th>Impact</Th>
      </Tr>
    </Thead>
    <Tbody>
        {}
    </Tbody>
   
  </Table>
</TableContainer>
        </div>
    </div> )
}