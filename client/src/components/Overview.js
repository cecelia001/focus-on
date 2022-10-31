import React, { useEffect, useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import DayCard from "./DayCard";
import AddDay from "./AddDay";

function Overview(props) {
  let [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    getOverviewData();
  }, []);

  async function getOverviewData() {
    try {
      let response = await fetch("/days");
      if (response.ok) {
        console.log(response);
        let overviewData = await response.json();
        setOverviewData(overviewData);
        // console.log(overviewData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function checkDate() {
    let getDay = new Date();
    var dd = String(getDay.getDate()).padStart(2, "0");
    var mm = String(getDay.getMonth() + 1).padStart(2, "0");
    var yyyy = getDay.getFullYear();
    let today = dd + "." + mm + "." + yyyy;
    const found = overviewData.findIndex(function (element) {
      return element.date === today;
    });
    if (found === -1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div>
      <Grid templateColumns="1">
        <GridItem color="#FFECEF" fontWeight="bold" justifySelf="end" mr={10}>
          <Text fontSize="6xl">FocusON</Text>
        </GridItem>
      </Grid>
      {overviewData && !checkDate() && <AddDay overviewData={overviewData} />}
      {/* overviewData is an empty array before getOverviewData() executes.
      If overviewData gets passed to DayCard before the data from the asynchronous function has arrived, it will be undefined.
      Therefore, either: overviewData && DayCard (DayCard will only render when condition is truthy) or as below: */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={8} m={10}>
        {overviewData.map((element) => {
          return <DayCard overviewData={element} key={element.id} />;
        })}
      </SimpleGrid>
    </div>
  );
}

// bg={
//   element.tasks.reduce(acc, element.tasks.completed) ===
//   element.tasks.length
//     ? "blue.500"
//     : "tomato"
// }

export default Overview;
