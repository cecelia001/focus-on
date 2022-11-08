var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all days

router.get("/:userId/", async function (req, res, next) {
  let { userId } =req.params;

  try {
    let daysData = [];

    let results = await db(`SELECT * FROM days WHERE user_id=${userId}`);
    let days = results.data;

    for (let date of days) {
      let taskResults = await db(`SELECT * FROM tasks WHERE day_id=${date.id} AND user_id=${userId}`);
      let tasks = taskResults.data;

      let pomodoroResults = await db(
        `SELECT * from pomodoro WHERE day_id=${date.id} AND user_id=${userId}`
      );
      let pomodoro = pomodoroResults.data;

      // build days object with all corresponding data

      date["tasks"] = tasks;
      date["sessions"] = pomodoro;

      daysData.push(date);
      // Alternative code: daysData.push({ ...date, tasks: tasks, sessions: pomodoro });
    }

    res.send(daysData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET day

router.get("/:userId/currentday/:id", async function (req, res, next) {
  let dayId = req.params.id;
  let userId = req.params.userId;
  try {
    let results = await db(`SELECT * FROM days WHERE id=${dayId} AND user_id=${userId}`);
    // days is an object
    let days = results.data;
    if (days.length === 0) {
      res.status(404).send({ error: "Day not found" });
    } else {
      //fetch remaining data: tasks
      let taskResults = await db(`SELECT * FROM tasks WHERE day_id=${dayId} AND user_id=${userId}`);
      // taskResults is an array with an object inside that gets added to days object
      days[0]["tasks"] = taskResults.data;
      //fetch remaining data: pomodoros
      let pomodoroResult = await db(
        `SELECT * FROM pomodoro WHERE day_id=${dayId} AND user_id=${userId}`
      );
      days[0]["sessions"] = pomodoroResult.data;
      res.send(days[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new day

router.post("/:userId/", async function (req, res, next) {
  let getDay = new Date();
  var dd = String(getDay.getDate()).padStart(2, "0");
  var mm = String(getDay.getMonth() + 1).padStart(2, "0");
  var yyyy = getDay.getFullYear();
  let today = dd + "." + mm + "." + yyyy;
  let userId = req.params.userId;

  try {
    let day = `SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`;
    let dayExist = await db(day);
    if (dayExist.data.length !== 0) {
      res.send({ error: "Day already exists." });
    } else {
      await db(`INSERT INTO days (date, user_id)
      VALUES ("${today}", ${userId})`);
      let result = await db(`SELECT * FROM days WHERE date="${today}" AND user_id=${userId}`);
      let days = result.data;
      res.status(201).send(days);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
