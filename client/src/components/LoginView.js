import React, { useState } from 'react';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.loginCb(username, password);
    }

    return (
    <form onSubmit={handleSubmit}>

            {
                props.loginError && (
                    <div className="alert alert-danger">{props.loginError}</div>
                )
            }


        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('#251B37', '#3C2C59')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
                rounded={'lg'}
                bg={useColorModeValue('#4fa296', '#4fa296')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type="username"
                            name="usernameInput"
                            required
                            className="form-control"
                            value={username}
                            onChange={handleChange}
                            />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password"
                            name="passwordInput"
                            required
                            className="form-control"
                            value={password}
                            onChange={handleChange}
                             />
                    </FormControl>
                    <Stack spacing={10}>
                        <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                        {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                    </Stack>
                    <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Sign in
                    </Button>
                    </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
    );
  }


export default LoginView;