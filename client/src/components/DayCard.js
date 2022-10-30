import React from "react";

function DayCard(props) {
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
      return <h3>No completed tasks for this day</h3>;
    } else {
      return <h3>Number of completed tasks: {completedTasks}</h3>;
    }
  }

  function isSuccess() {
    if (completedTasks === tasks.length) {
      return <h3>Success: YES!</h3>;
    } else {
      return <h3>Success: No</h3>;
    }
  }

  return (
    <div>
      <h3>{props.overviewData.date}</h3>
      {getCompletedTasks()}
      <h3>Pomodoro sessions: {props.overviewData.sessions.length}</h3>
      {isSuccess()}
      <a href={linkToFocusView}>Link to focus view </a>
    </div>
  );
}

export default DayCard;
