import { Button, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Signup(){
    const [input, setInput] = useState({userName:"", email:"", password:""})
    const toast = useToast();
    const navigate = useNavigate();
    const handleSignin = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post('https://statxo-test-case.onrender.com/users/',input);
            
          if (response.status == 201) {
            toast({
                title: 'Registration successful.',
                description: 'You can now log in.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            return;
          }
    
          localStorage.setItem('loggedIn', JSON.stringify(user));
        } catch (error) {
          console.error('Error fetching user credentials:', error);
          toast({
            title: 'Error',
            description: 'Failed to fetch user credentials.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };
    return (
        <div className="signup-section">
            <form onSubmit={handleSignin}>
            <VStack spacing={4} bg='white'>
                <Heading>Sign Up</Heading>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Username</FormLabel>
                <Input
                  type="username"
                  name="userName"
                  placeholder="Username"
                  value={input.username}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={input.username}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <FormControl isRequired bg='white'>
                <FormLabel bg='white'>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  style={{border:'1px solid'}}
                />
              </FormControl>
              <Link to="/signup"></Link>
              <Button type="submit" colorScheme="blue" width="full">
              Sign Up
              </Button>
              <Text mt={4} textAlign="center" bg='white'>
            Don't have an account?{' '}
            <Link to="/login">
              <Text as="u" color="blue.500">
                Login
              </Text>
            </Link>
          </Text>
            </VStack>
          </form>
        </div>
    )
}