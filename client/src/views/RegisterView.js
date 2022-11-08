import React, { useState } from 'react';
import { 
    Button,
    Heading,
    Container,
    Input,
    Stack,
    InputGroup,
    InputLeftElement,
 } from '@chakra-ui/react'


import Api from "../helpers/Api";


function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    
    
    async function doRegister(){
      
        const newUserObj = {
            username: username,
            password: password,
            email: email
        }
      

    let response = await Api.registerUser(newUserObj);
      if (response.ok) {
        props.loginCb && props.loginCb(username, password);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
 
  }
    


    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            case 'emailInput':
                setEmail(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        doRegister();
        props.loginCb(username, password);
    }



    return (
        <Container maxW='md' color='white'>
        
        <Stack spacing="8">

          <Heading fontsize="lg" mt="50px" mb="30px">
            Register
          </Heading>

      </Stack>

        <div className="LoginView row">
                
                {
                    props.loginError && (
                        <div className="alert alert-danger">{props.loginError}</div>
                    )
                }

                <form onSubmit={handleSubmit} >

                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftElement
                            pointerEvents='none'
                            />
                            <Input 
                                type='text' 
                                placeholder='Username'
                                name="usernameInput"
                                required
                                className="form-control"
                                value={username}
                                onChange={handleChange}
                                 />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.2em'
                            />
                            <Input 
                            type="password"
                            name="passwordInput"
                            required
                            className="form-control"
                            value={password}
                            onChange={handleChange}
                            placeholder='Password' />

                            <Input 
                            type="email"
                            name="emailInput"
                            required
                            className="form-control"
                            value={email}
                            onChange={handleChange}
                            placeholder='Email' />
                        </InputGroup>
                    </Stack>

                    <Button colorScheme='blue' mt="20px" type="submit" >Submit</Button>
                </form>
        </div>
        </Container>
    );

}

export default RegisterView;