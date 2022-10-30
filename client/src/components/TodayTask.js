import React, { useState } from "react";
import { Container } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

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

  async function addTask() {
    const newTaskObject = {
      title: inputData.todo,
      description: inputData.description,
      day_id: props.currentDayData.id,
      completed: 0,
    };

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskObject),
    };
    try {
      let response = await fetch("/tasks", options);
      if (response.ok) {
        props.updateDataCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function updateTask(id) {
    console.log(id);
  }

  async function deleteTask(id) {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/tasks/${id}`, options);
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
    <div>
      <Container p="6">
        <div>
          <h4>List of tasks</h4>
          {props.currentDayData.tasks.map((element) => (
            <li key={element.id}>
              {element.title}
              <Button onClick={() => updateTask(element.id)}>Done</Button>
              <IconButton
                aria-label="Delete task"
                icon={<DeleteIcon />}
                onClick={() => deleteTask(element.id)}
              />
            </li>
          ))}
        </div>
      </Container>
      <Container p="6">
        <div>
          <h4>Add a task:</h4>
          <form onSubmit={handleSubmit}>
            <label>
              To Do:
              <Input
                type="text"
                name="todo"
                value={inputData.todo}
                onChange={handleChange}
              />
            </label>
            <label>
              Describe To Do:
              <Input
                type="text"
                name="description"
                value={inputData.description}
                onChange={handleChange}
              />
            </label>
            <Button>Add To Do</Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default TodayTask;
