import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import {Chart, Tooltip, Legend, ArcElement} from 'chart.js/auto'
import {Pie} from 'react-chartjs-2'
import { useSelector } from 'react-redux'

Chart.register(Tooltip, Legend, ArcElement)
export function BasicChart(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const data = useSelector(state => state.data.data)
    console.log(data);
    const pieChartData = {
        labels:["Low","Mid", "High"],
        datasets:[
            {
                label:"Tasks ratio",
                data: data.reduce((prev, elem)=>{ 
                    if(elem.Impact == "Low") return [prev[0]+1, prev[1], prev[2]]
                    if(elem.Impact == "Mid") return [prev[0], prev[1]+1, prev[2]]
                    if(elem.Impact == "High") return [prev[0], prev[1], prev[2]+1]
                },[0,0,0,0]),
                backgroundColor:[
                    "rgba(54, 162, 235, 0.9)",
                    "rgba(255, 206, 86, 0.9)",
                    "rgba(255, 99, 132, 0.9)" 
                ],
                hoverOffset:4
            }
        ]
    }
  
    return (
        <Box textAlign={"right"} >
      <Button colorScheme="blue" onClick={onOpen}>Chart</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pie Chart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Pie options={{}} data={pieChartData} />
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