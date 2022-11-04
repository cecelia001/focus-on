import React from "react";
import { Link } from "react-router-dom";

import { Box, Heading, Text, Button } from "@chakra-ui/react";

function WelcomePage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, rose.400, teal.600)"
        backgroundClip="text"
      >
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Welcome to Focus:ON! 
      </Text>
      <Text color={"gray.500"} mb={6}>
        Description of page will go here. Create account or login to get started. 
      </Text>

      <Button
        colorScheme="gray"
        bgGradient="linear(to-r, gray.400, gray.500, gray.600)"
        color="white"
        variant="solid"
      >
        <Link to="/">Go back to overview</Link>
      </Button>
    </Box>
  );
}

export default WelcomePage;
