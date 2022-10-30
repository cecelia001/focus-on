import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TodayTask from "./TodayTask";
import Tracker from "./Tracker";
import { Container } from "@chakra-ui/react";

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
      <Container p="6">
        <h2>Current Day Component</h2>
      </Container>
      <Link to="/">Go back to overview</Link>

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
    </div>
  );
}

export default CurrentDay;
