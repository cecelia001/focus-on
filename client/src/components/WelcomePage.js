import React from "react";
// import { Link } from "react-router-dom";                       //will this cause a problem??
import { Link, Box, Button, Container, GridItem, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react'

import { TimeIcon } from '@chakra-ui/icons';


function WelcomePage() {
  return (
<Box as="section" bg="bg-surface">
    <Container py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '8', md: '10' }}>
        <Stack spacing={{ base: '4', md: '5' }} align="center">
          <Heading as='h1' size='3xl' noOfLines={1}>Focus:ON</Heading>
          <Heading as='h2' size='lg' noOfLines={1}>Ready to be productive?</Heading>
          <TimeIcon color="#F7FAFC" w={160} h={160}/>
          <Heading as='h2' size='md' noOfLines={1}>3...2...1...GO!</Heading>
        </Stack>

        

    {/* <Button
        colorScheme="gray"
        bgGradient="linear(to-r, gray.400, gray.500, gray.600)"
        color="white"
        variant="solid"
      >
        <Link as="a" href="/login">Login here</Link>
      </Button> */}

      </Stack>
    </Container>
  </Box>

  );
}

export default WelcomePage;
