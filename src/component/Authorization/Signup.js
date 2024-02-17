import  React from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";


const Signup = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const handleClick = () => setShow(!show);
    const toast = useToast();


      const resetState = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmpassword('');
        setPic();

      };
 
  const submitHandler = async () => {
      setLoading(true);
        if (!name || !email || !phone || !password || !confirmpassword) {
            toast({
              title: "Please Fill all the Feilds",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return;
          }
          if(/^[A-Za-z]+$/.test(name)===false){
            toast({
              title: "Please enter Valid Name",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return;
          }

          if(/^[6-9]\d{9}$/.test(phone)===false){
            toast({
              title: "Please enter Valid Number",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return;     
          }
          if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())===false){
            toast({
              title: "Please enter Valid Email",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return; 
          }
          if(password.length < 6){
            toast({
              title: "Password Should minimum 6 letters",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return;
          }

          if (password !== confirmpassword) {
            toast({
              title: "Passwords Do Not Match",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return;
          }

          if(pic && !(pic.type === "image/jpeg" || pic.type === "image/png")){
            toast({
              title: "Please Upload Images Only!!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            return;
          }



          try {
            const config = {
              headers: {
                "Content-type": "multipart/form-data; boundary=<calculated when request is sent>",
              },
            };
            const { data } = await axios.post(
              "http://localhost:5000/api/user/signup",
              {
                name,
                phone,
                email,
                password,
                "profileImage":pic,
              },
              config
            );
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
            localStorage.setItem("userInfo", JSON.stringify(data));
            
            resetState();
    

          } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
        }
        
    }

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="Enter Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl  id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            value={confirmpassword}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
         onChange={(e) => setPic(e.target.files[0])}
         value={pic}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
  
}

export default Signup