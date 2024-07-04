import { Button, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Login(){

    const [input, setInput] = useState({userName:"", password:""})
    const toast = useToast()
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            console.log(input);
          const response = await axios.get('https://statxo-test-case.onrender.com/users/'+input.userName+"/"+input.password);
            console.log(response);
         
            toast({
                title: 'Login successful.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            localStorage.setItem('loggedIn', JSON.stringify(response.data));
            navigate("/")
            return;
    
        } catch (error) {
          console.error('Error fetching user credentials:', error);
          toast({
            title: 'Login failed.',
            description: 'Wrong email or password.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };
    return (
        <div className="login-section">
            <form onSubmit={handleLogin}>
            <VStack spacing={4} bg='white'>
                <Heading>Login</Heading>
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
                Login
              </Button>
              <Text mt={4} textAlign="center" bg='white'>
            Don't have an account?{' '}
            <Link to="/signup">
              <Text as="u" color="blue.500">
                Sign Up
              </Text>
            </Link>
          </Text>
            </VStack>
          </form>
        </div>
    )
}