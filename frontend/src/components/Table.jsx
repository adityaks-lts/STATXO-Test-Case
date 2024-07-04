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
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export function DataTable() {
  const user = JSON.parse(localStorage.getItem("loggedIn"));
  const [editMode, setEditMode] = useState(false);
  const data = useSelector((state) => state.data);
  const ActionNames = ["Action1", "Action2", "Action3"]
  const ActionTypes = ["Type1", "Type2", "Type3"]
  const [editData, setEditData] = useState({});

  function handleUpdate() {
    console.log(editData);
  }

  return (
    <div>
      <Box textAlign={"right"} md={4}>
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
                        {!editMode && elem.status}
                        {editMode && (
                          <Input
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
                          />
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
