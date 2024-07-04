import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react"

export function Form() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState({});
    function handleAdd(){

    }
    
    return (
      <>
        <Button m={10} colorScheme="blue" onClick={onOpen}>Add Data</Button>
  
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
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={input.quantity}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Amount</FormLabel>
                <Input
                  type="text"
                  name="amount"
                  placeholder="Amount"
                  value={input.amount}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Posting Year</FormLabel>
                <Input
                  type="text"
                  name="postingYear"
                  placeholder="Posting Year"
                  value={input.postingYear}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Posting Month</FormLabel>
                <Input
                  type="text"
                  name="postingMonth"
                  placeholder="Posting Month"
                  value={input.postingMonth}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Action Type</FormLabel>
                <Input
                  type="text"
                  name="actionType"
                  placeholder="Action Type"
                  value={input.actionType}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Action Number</FormLabel>
                <Input
                  type="text"
                  name="actionNumber"
                  placeholder="Action Number"
                  value={input.actionNumber}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Action Name</FormLabel>
                <Input
                  type="text"
                  name="actionName"
                  placeholder="Action Name"
                  value={input.actionName}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Status</FormLabel>
                <Input
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={input.status}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Impact</FormLabel>
                <Input
                  type="text"
                  name="Impact"
                  placeholder="Impact"
                  value={input.Impact}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              
             
            </VStack>
          </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={()=>{
                handleAdd();
                onClose()
              }}>Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }