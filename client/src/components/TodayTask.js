import React, { useState } from "react";

import Local from "../helpers/Local";
import Api from "../helpers/Api";

import {
  Container,
  Text,
  Input,
  Button,
  IconButton,
  Box,
  Textarea,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

const INIT_STATE = {
  todo: "",
  description: "",
};

function TodayTask(props) {
  let [inputData, setInputData] = useState(INIT_STATE);

  function handleChange(event) {
    let { name, value } = event.target;
    setInputData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    addTask();
    setInputData(INIT_STATE);
  }

  async function addTask(userid) {
    let id = Local.getUserId()
    

    const newTaskObj = {
      title: inputData.todo,
      description: inputData.description,
      day_id: props.currentDayData.id,
      completed: 0,
      user_id: id     
    };

    console.log(newTaskObj.user_id);

    let response = await Api.addTask(newTaskObj);

    // let options = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newTaskObject),
    // };
    // try {
    //   let response = await fetch(`/tasks/${userid}`, options);  //added userid here!
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    // } catch (err) {
    //   console.log(`Server error: ${err.message}`);
    // }
  }

  async function updateTask(id) {
    let completedTask = {
      completed: 1,
    };
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(completedTask),
    };
    try {
      let response = await fetch(`/tasks/${id}/completed`, options);
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function deleteTask(userid, id) {       //tried passing userid here and on line 95 but not working
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/tasks/${userid}/${id}`, options);
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <Container color="#FFECEF">
      <Container>
        <Text fontSize="xl" mb={5}>
          Today's Tasks:
        </Text>
      </Container>

      <Accordion allowToggle>
        {props.currentDayData.tasks.map((element) => (
          <AccordionItem key={element.id}>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  textDecoration={
                    element.completed === 1 ? "line-through" : null
                  }
                >
                  {element.title}
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={"left"} bg={"#372948"}>
              {element.description}
              <br></br>
              <Container display={"flex"} justifyContent={"flex-end"}>
                <IconButton
                  aria-label="Mark task as done"
                  icon={<CheckIcon />}
                  m={2}
                  bg="#FFCACA"
                  color="#372948"
                  size={"xs"}
                  _hover={{ background: "#FFECEF" }}
                  onClick={() => updateTask(element.id)}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<DeleteIcon />}
                  bg="#FFCACA"
                  m={2}
                  color="#372948"
                  size={"xs"}
                  _hover={{ background: "#FFECEF" }}
                  onClick={() => deleteTask(element.id)}
                />
              </Container>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Container p="6">
        <Text fontSize="lg" m={2}>
          New To-Do
        </Text>
        <form onSubmit={handleSubmit}>
          <label>
            Task:
            <Input
              m={2}
              type="text"
              name="todo"
              value={inputData.todo}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <Textarea
              m={2}
              type="text"
              name="description"
              value={inputData.description}
              onChange={handleChange}
            />
          </label>
          <Button
            m={2}
            bg="#FFCACA"
            color="#372948"
            _hover={{ background: "#FFECEF" }}
            type="submit"
          >
            Add
          </Button>
        </form>
      </Container>
    </Container>
  );
}

export default TodayTask;
