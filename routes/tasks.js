var express = require("express");
var router = express.Router();
const { ensureSameUser, ensureSameUserP } = require('../middleware/guards');
const db = require("../model/helper");

// GET all tasks

router.get("/:userId/", ensureSameUser, async function (req, res, next) {
  let { userId } = req.params;
  let sql = 'SELECT * FROM tasks WHERE user_id = ' + userId;

  try {
    let tasks = await db(sql);
    res.send(tasks.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET all task for a day

router.get("/:userId/:day/", ensureSameUser, async function (req, res, next) {
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

router.post("/", ensureSameUser, async (req, res) => {
  // let userId = req.params.userId;
  let { title, description, day_id, completed, user_id } = req.body;

  let sql = `
      INSERT INTO tasks (title, description, day_id, completed, user_id)
      VALUES ('${title}', '${description}', ${day_id}, ${completed}, ${user_id})
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM tasks WHERE user_id = ${user_id}`);  //edited to add where clause
    let tasks = result.data;
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a task from DB

router.delete("/:userId/:id", ensureSameUserP, async function (req, res, next) {
  let taskId = req.params.id;
  let userId = req.params.userId;

  try {
    let result = await db(`SELECT * FROM tasks WHERE user_id=${userId} AND id=${taskId}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Task not found" });
    } else {
      await db(`DELETE FROM tasks WHERE user_id=${userId} AND id=${taskId}`);
      let result = await db(`SELECT * FROM tasks`);
      let tasks = result.data;
      res.status(201).send(tasks);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE completed in task

router.patch("/:userId/:id/completed", ensureSameUserP, async function (req, res, next) {
  let userId = req.params.userId;
  let taskId = req.params.id;
  let changes = req.body;
  try {
    await db(
      `UPDATE tasks SET completed=${changes.completed} WHERE user_id=${userId} AND id=${taskId}`
    );
    let updatedTask = await db(`SELECT * FROM tasks WHERE user_id=${userId} AND id=${taskId}`);
    res.status(201).send(updatedTask.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
