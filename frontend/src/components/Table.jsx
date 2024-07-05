import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Form } from "./Form";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logs } from "./logs";


export function DataTable() {
  const user = JSON.parse(localStorage.getItem("loggedIn"));
  var postUrl = user.role == "user" ? "https://statxo-test-case.onrender.com/data/user/" : "https://statxo-test-case.onrender.com/data/admin/"
  const [editMode, setEditMode] = useState(false);
  const data = useSelector((state) => state.data);
  const ActionNames = ["Action1", "Action2", "Action3"]
  const ActionTypes = ["Type1", "Type2", "Type3"]
  const [editData, setEditData] = useState({});
  const config = {headers:{Authorization:`Bearer ${user.accessToken}`}}
  const toast = useToast();
  const dispatch = useDispatch()
  // console.log(user.role);
  function handleUpdate() {
    Object.keys(editData).forEach((elem)=>{
      console.log(elem, editData[elem]);
      axios.patch(postUrl+elem,editData[elem], config)
      .then(res => {
        // 
        dispatch({type:"REFRESH"})
        console.log(elem, "Success");
        toast({
          title: `${elem} updated successfully`,
          status:"success",
          isClosable:true,
          duration:1000,
        })
      })
      .catch((err)=>{
        toast({
          title:`${elem} Some error have occurred`,
          status:"failed",
          isClosable:true,
          duration:1000,
        })
        console.log(elem, "Failed", err);
      })
    })
  }

  return (
    <div>
      <Box display={"flex"} textAlign={"right"} gap={5} mx={4}>
        <Form />
        <Logs/>
        <Button

          onClick={() => {
            setEditMode((prev) => !prev);
          }}
        >
          Edit
        </Button>
        {editMode && <Button colorScheme="green" onClick={handleUpdate}>Update All</Button>}
      </Box>
      <div>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                {/* <Th isNumeric>ID</Th> */}
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
              {data.status == "success" &&
                data.data.map((elem, index) => {
                  // console.log(elem)
                  return (
                    <Tr key={elem._id}>
                      {/* <Td>{!editMode && elem._id}</Td> */}
                      <Td>
                        {elem.quantity}
                      </Td>
                      <Td>
                        {!editMode && elem.amount}
                        {editMode && (
                          <Input
                            value={elem.amount}
                            type="number"
                            min={0}
                            name="amount"
                            onChange={(e) => {
                              elem.amount = e.target.value;
                              setEditData({
                                ...editData,
                                [elem._id]: {
                                  ...editData[elem._id],
                                  [e.target.name]: e.target.value,
                                },
                              });
                            }}
                          />
                        )}
                      </Td>
                      <Td>
                        {elem.postingYear}
                      </Td>
                      <Td>
                        {elem.postingMonth}
                      </Td>
                      <Td>
                        {!editMode && elem.actionType}
                        {editMode && (
                          <Select
                            value={elem.actionType}
                            name="actionType"
                            onChange={(e) => {
                              elem.actionType = e.target.value;
                              setEditData({
                                ...editData,
                                [elem._id]: {
                                  ...editData[elem._id],
                                  [e.target.name]: e.target.value,
                                },
                              });
                            }}
                          >
                            {ActionTypes.map(((elem) => {
                              return <option value={elem}>{elem}</option>
                            }))}
                          </Select>
                        )}
                      </Td>
                      <Td>
                        {elem.actionNumber}
                      </Td>
                      <Td>
                        {!editMode && elem.actionName}
                        {editMode && (
                          <Select
                            value={elem.actionName}
                            name="actionName"
                            onChange={(e) => {
                              elem.actionName = e.target.value;
                              setEditData({
                                ...editData,
                                [elem._id]: {
                                  ...editData[elem._id],
                                  [e.target.name]: e.target.value,
                                },
                              });
                            }}
                          >
                            {ActionNames.map((elem) => {
                              return <option value={elem}>{elem}</option>
                            })}
                          </Select>
                        )}
                      </Td>
                      <Td>
                        {(!editMode || user.role == "user") && elem.status}
                        {editMode && user.role == "admin" && (
                          <Select
                            value={elem.status}
                            type="text"
                            name="status"
                            onChange={(e) => {
                              elem.status = e.target.value;
                              setEditData({
                                ...editData,
                                [elem._id]: {
                                  ...editData[elem._id],
                                  [e.target.name]: e.target.value,
                                },
                              });
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="approved">Approved</option>
                          </Select>
                        )}
                      </Td>
                      <Td>
                        {elem.Impact}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
