import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Text, Button, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

import TodayTask from "../components/TodayTask";    
import Tracker from "../components/Tracker";

function CurrentDay(props) {
  let { id } = useParams();
  let [currentDayData, setCurrentDayData] = useState({});

  useEffect(() => {
    getCurrentDayData();
  }, []);

  async function getCurrentDayData() {
    try {
      let response = await fetch(`/days/${id}`);
      if (response.ok) {
        let currentDayData = await response.json();

        setCurrentDayData(currentDayData);
        console.log(currentDayData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div>
      <Grid templateColumns="1">
        <GridItem color="#FFECEF" justifySelf="end" mr={10} mb={2}>
          <Text fontSize="6xl" fontWeight="bold">
            Focus:ON
          </Text>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem mb={8}>
          <Text color="#FFECEF" fontSize="3xl">
            Focus Dashboard: {currentDayData.date}
          </Text>
        </GridItem>
      </Grid>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>
        {currentDayData.tasks && (
          <TodayTask
            currentDayData={currentDayData}
            updateDataCb={getCurrentDayData}
          />
        )}

        <Tracker
          dayId={currentDayData.id}
          sessions={currentDayData.sessions}
          updateDataCb={getCurrentDayData}
        />
      </SimpleGrid>
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
        <Link to="/">Go back to overview</Link>
      </Button>
    </div>
  );
}

export default CurrentDay;
