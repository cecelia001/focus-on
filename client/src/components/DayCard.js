import React from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function DayCard(props) {
  const navigate = useNavigate();
  let completedTasks = 0;
  let tasks = props.overviewData.tasks;

  let linkToFocusView = `/focus/${props.overviewData.id}`;

  function getCompletedTasks() {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === 1) {
        completedTasks += 1;
      }
    }
    if (completedTasks === 0) {
      return <Text>No completed tasks for this day</Text>;
    } else {
      return <Text>Number of completed tasks: {completedTasks}</Text>;
    }
  }

  function isSuccess() {
    if (completedTasks === tasks.length) {
      return (
        <Text>
          Success: YES! <br></br>
          <span style={{ fontSize: "2.5rem" }}>👏</span>
        </Text>
      );
    } else {
      return <Text>Success: No</Text>;
    }
  }

  function changeView() {
    navigate(linkToFocusView);
  }

  return (
    <GridItem
      w="100%"
      h="200"
      bg="#FFECEF"
      color="#372948"
      borderRadius="lg"
      borderWidth="medium"
      borderColor="#FFCACA"
      cursor="pointer"
      onClick={changeView}
      _hover={{
        transform: "scale(1.05)",
        transition: "all 200ms ease",
        boxShadow: "red-lg",
      }}
    >
      <Container mt={8}>
        <Text>{props.overviewData.date}</Text>
        {getCompletedTasks()}
        <Text>Pomodoro sessions: {props.overviewData.sessions.length}</Text>
        {isSuccess()}
      </Container>
    </GridItem>
  );
}

export default DayCard;
