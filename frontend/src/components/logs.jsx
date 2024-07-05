import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export function Logs(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [logs,setLogs] = useState() 
    useEffect(()=>{
        axios.get("https://statxo-test-case.onrender.com/logs/")
        .then(res =>{setLogs(res.data)})
        .catch(err => console.log(err))
    })
    return (
        <Box textAlign={"right"} >
      <Button colorScheme="blue" onClick={onOpen}>Show Logs</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {logs && logs.split('\n').map(elem =>{
                return <p>{elem}</p>
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    )
}