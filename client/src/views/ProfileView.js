import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';
import { Box, Container, SimpleGrid, Heading, Stack, Text } from '@chakra-ui/react'


function ProfileView(props) {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    let { userId } = useParams();

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        let myresponse = await Api.getUser(userId);
        if (myresponse.ok) {
            setUser(myresponse.data);
            setErrorMsg('');
        } else {
            setUser(null);
            let msg = `Error ${myresponse.status}: ${myresponse.error}`;
            setErrorMsg(msg);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (

            <Box as="section" bg="bg-surface">
                <Container py={{ base: '16', md: '24' }}>
                  <Stack spacing={{ base: '8', md: '10' }}>
                    <Stack spacing={{ base: '4', md: '5' }} align="center">
                      <Heading as='h1' size='3xl' noOfLines={1}>Profile</Heading>

                      <SimpleGrid columns={1} spacingX='40px' spacingY='20px'>
                            <Box bg='#FFECEF' height='40px' width= '300px' color="#372948" borderRadius="lg" borderWidth="medium">
                                <Text as='h4' size='lg' noOfLines={1}>
                                ID: {user.id}
                                </Text>
                            </Box>

                            <Box bg='#FFECEF' height='40px' width= '300px' color="#372948" borderRadius="lg" borderWidth="medium">
                                <Text as='h4' size='lg' noOfLines={1}>
                                Username: {user.username}
                                </Text>
                            </Box>

                            <Box bg='#FFECEF' height='40px' width= '300px' color="#372948" borderRadius="lg" borderWidth="medium">
                                <Text as='h4' size='lg' noOfLines={1}>
                                Email: {user.email}
                                </Text>
                            </Box>
                     </SimpleGrid>
                    </Stack>
                  </Stack>
                </Container>
              </Box>
   
    );
}


export default ProfileView;