import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import DayCard from "./DayCard";

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
  return (
    <div>
      {/* overviewData is an empty array before getOverviewData() executes.
      If overviewData gets passed to DayCard before the data from the asynchronous function has arrived, it will be undefined.
      Therefore, either: overviewData && DayCard (DayCard will only render when condition is truthy) or as below: */}
      {/* <Box bg="grey"> */}
      {overviewData.map((element) => {
        return (
          <Box bg="grey" p={4} borderWidth="1px" borderRadius="1g">
            <DayCard key={element.id} overviewData={element} />{" "}
          </Box>
        );
      })}
      {/* </Box> */}
    </div>
  );
}

export default Overview;
