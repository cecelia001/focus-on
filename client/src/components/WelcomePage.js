import React from "react";
// import { Link } from "react-router-dom";                      
import { Box, Button, Container, Heading, Link, Stack } from '@chakra-ui/react'

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
      </Stack>
    </Container>

    <Button
        borderWidth={1}
        borderColor="#FFECEF"
        borderRadius={"lg"}
        bg="#251B37"
        color="#FFCACA"
        _hover={{ background: "#372948" }}
        mt={4}
        mb={4}
        p={6}
        fontSize="lg"
      >
        <Link as="a" href="/register"> Register</Link>
      </Button>

      <Button
        borderWidth={1}
        borderColor="#FFECEF"
        borderRadius={"lg"}
        bg="#251B37"
        color="#FFCACA"
        _hover={{ background: "#372948" }}
        mt={4}
        mb={4}
        p={6}
        fontSize="lg"
      >
        <Link as="a" href="/login"> Login</Link>
      </Button>

  </Box>

  );
}

export default WelcomePage;
