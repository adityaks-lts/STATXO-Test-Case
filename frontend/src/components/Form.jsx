import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";

export function Form() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date();
  const postingYear  = currentDate.getFullYear();
  const postingMonth = monthNames[currentDate.getMonth()];
  const toast = useToast();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    postingYear , postingMonth , status:'Pending'
  });
  const ActionNames = ["Action1", "Action2", "Action3"]
  const ActionTypes = ["Type1", "Type2", "Type3"]
  const token = JSON.parse(localStorage.getItem("loggedIn")).accessToken;
  const config = {headers:{Authorization:`Bearer ${token}`}}
  function handleAdd() {
    console.log(input);
    axios.post("https://statxo-test-case.onrender.com/data/",input ,config)
    .then(res =>  { 
      dispatch({type:"REFRESH"});
      toast({
      title: 'Data Added Successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })})
    .catch((err) => console.log(err))
  }

  return (
    <Box textAlign={"right"} >
      <Button colorScheme="blue" onClick={onOpen}>Add Data</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form >
              <VStack spacing={4} bg='white'>
                <FormControl isRequired bg='white'>
                  <FormLabel bg='white'>Quantity</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={input.quantity}
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    style={{ border: '1px solid' }}
                  />
                </FormControl>
                <FormControl isRequired bg='white'>
                  <FormLabel bg='white'>Amount</FormLabel>
                  <Input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={input.amount}
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    style={{ border: '1px solid' }}
                  />
                </FormControl>


                <FormControl isRequired bg='white'>
                  <FormLabel bg='white'>Action Type</FormLabel>
                  <Select
                    name="actionType"
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    style={{ border: '1px solid' }}
                  >
                    {ActionTypes.map(((elem) => {
                      return <option value={elem}>{elem}</option>
                    }))}
                  </Select>
                </FormControl>
                <FormControl isRequired bg='white'>
                  <FormLabel bg='white'>Action Number</FormLabel>
                  <Input
                    type="number"
                    name="actionNumber"
                    placeholder="Action Number"
                    value={input.actionNumber}
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    style={{ border: '1px solid' }}
                  />
                </FormControl>
                <FormControl isRequired bg='white'>
                  <FormLabel bg='white'>Action Name</FormLabel>
                  <Select
                    name="actionName"
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    style={{ border: '1px solid' }}
                  >
                    {ActionNames.map((elem) => {
                      return <option value={elem}>{elem}</option>
                    })}
                  </Select>
                </FormControl>
                
                <FormControl isRequired bg='white'>
                  <FormLabel bg='white'>Impact</FormLabel>
                  <Select
                    type="text"
                    name="Impact"
                    value={input.Impact}
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    style={{ border: '1px solid' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Mid">Mid</option>
                    <option value="High">High</option>
                  </Select>
                </FormControl>


              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={() => {
              handleAdd();
              onClose()
            }}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}