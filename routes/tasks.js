var express = require("express");
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET all tasks

router.get("/:userId/", ensureSameUser, async function (req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT * FROM tasks WHERE user_id= ${userId}`;  //took out part with userId

  try {
    let tasks = await db(sql);
    res.send(tasks.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET all task for a day

router.get("/:day", ensureSameUser, async function (req, res, next) {
  let { userId, day } = req.params;

  try {
    let results = await db(`SELECT * FROM tasks WHERE user_id = ${userId} AND day_id=${day}`);
    let tasks = results.data;
    if (tasks.length === 0) {
      res
        .status(404)
        .send({ error: "There are no tasks for the requested day" });
    } else {
      res.send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new task into the DB

router.post("/:user_id/", ensureSameUser, async (req, res) => {
  let { user_id } = req.params;
  let { title, description, day_id, completed } = req.body;

  let sql = `
      INSERT INTO tasks (title, description, day_id, completed, user_id)
      VALUES ('${title}', '${description}', ${day_id}, ${completed}, ${+user_id})
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM tasks`); 
    let tasks = result.data;
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a task from DB

router.delete("/:id", ensureSameUser, async function (req, res, next) {
  let taskId = req.params.id;
  // let userId = req.params.userId;

  try {
    let result = await db(`SELECT * FROM tasks WHERE id=${taskId}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Task not found" });
    } else {
      await db(`DELETE FROM tasks WHERE id=${taskId}`);
      let result = await db(`SELECT * FROM tasks`);
      let tasks = result.data;
      res.status(201).send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE completed in task

router.patch("/:id/completed", ensureSameUser, async function (req, res, next) {
  let userId = req.params.userId;
  const taskId = req.params.id;
  const changes = req.body;
  try {
    await db(
      `UPDATE tasks SET completed=${changes.completed} WHERE id=${taskId}`
    );
    let updatedTask = await db(`SELECT * FROM tasks WHERE id=${taskId}`);
    res.status(201).send(updatedTask.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
