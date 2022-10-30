import React, { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function Tracker(props) {
  let [time, setTime] = useState(1500);
  let [intervalId, setIntervalId] = useState(null);

  function printTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 1500) {
      minutes = "0" + minutes;
    }
    if (seconds < 1500) {
      seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (time === 0) {
      // reset tracker
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(() => null);
      }
      setTime(() => 1500);

      async function sendNewSession() {
        let session = { day_id: props.dayId };
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session),
        };
        try {
          let response = await fetch("/pomodoro", options);
          if (response.ok) {
            console.log(session);
            props.updateDataCb();
          } else {
            console.log(
              `Server error: ${response.status} ${response.statusText}`
            );
          }
        } catch (err) {
          console.log(`Network error: ${err.message}`);
        }
      }

      sendNewSession();
      // force refetch from parent
    }
  }, [props, time, intervalId]);

  function startTimer() {
    if (!intervalId) {
      const intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1500);
      setIntervalId(() => intervalId);
    }
    console.log(props.sessions);
  }

  function pauseTimer() {
    clearInterval(intervalId);
    setIntervalId(() => null);
  }

  function resetTimer() {
    // if intervalId is set turn off interval and set intervalstate to null
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(() => null);
    }
    setTime(() => 1500);
  }

  function printSessions() {
    if (!props.sessions) {
      return <h4>No completed sessions today.</h4>;
    } else if (props.sessions.length === 1) {
      return <h4>You have completed one session today.</h4>;
    } else {
      return <h4>You have completed {props.sessions.length} sessions.</h4>;
    }
  }

  return (
    <div>
      <h4>Pomodoro Tracker</h4>
      <h3>Instructions</h3>
      <ul>
        <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</li>
        <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</li>
        <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</li>
        <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</li>
      </ul>
      <CircularProgress value={(time / 1500) * 1500} color="grey" size="xs">
        <CircularProgressLabel fontSize="large">
          {printTime()} Minutes
        </CircularProgressLabel>
      </CircularProgress>
      <Button isDisabled={time < 1500} onClick={startTimer} colorScheme="blue">
        Start
      </Button>
      {time < 1500 && (
        <Button
          onClick={intervalId ? pauseTimer : startTimer}
          colorScheme="blue"
        >
          {intervalId ? "Timeout" : "Continue"}
        </Button>
      )}
      {time < 1500 && (
        <Button onClick={resetTimer} colorScheme="blue">
          Reset
        </Button>
      )}
      {printSessions()}
    </div>
  );
}

export default Tracker;
