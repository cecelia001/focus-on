import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Grid, GridItem, Text } from "@chakra-ui/react";

import Local from "../helpers/Local";
import Api from "../helpers/Api";

function AddDay(props) {
  const navigate = useNavigate();

  async function insertDay() {
    let id = Local.getUserId()


      let response = await Api.addDay(id);
      
      if (response.ok) {
        // let newDay = await response.json();
        let dayId = response.data[0].id;
        navigate(`/current/${dayId}`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  }

  return (
    <Grid
      w="50%"
      h="200"
      mt={5}
      mb={10}
      ml={10}
      borderWidth="2px"
      borderRadius={"lg"}
      borderColor={"#FFECEF"}
    >
      <GridItem color="#FFECEF" p={5}>
        <Text textAlign="left" fontSize="xl">
          There is no entry for today!
        </Text>
        <Text textAlign="left" fontSize="lgS">
          Do you want to plan your day and increase productivity?
        </Text>
      </GridItem>
      <GridItem textAlign="left" p={5}>
        <Button
          bg="#FFCACA"
          color="#372948"
          _hover={{ background: "#FFECEF" }}
          onClick={insertDay}
        >
          Yes! Plan new day!
        </Button>
      </GridItem>
    </Grid>
  );
}

export default AddDay;
