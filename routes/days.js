var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all days

router.get("/", async function (req, res, next) {
  try {
    let daysData = [];

    let results = await db("SELECT * FROM days;");
    let days = results.data;

    for (let date of days) {
      let taskResults = await db(`SELECT * FROM tasks WHERE day_id=${date.id}`);
      let tasks = taskResults.data;

      let pomodoroResults = await db(
        `SELECT * from pomodoro WHERE day_id=${date.id}`
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

router.get("/:id", async function (req, res, next) {
  let dayId = req.params.id;
  try {
    let results = await db(`SELECT * FROM days WHERE id=${dayId}`);
    // days is an object
    let days = results.data;
    if (days.length === 0) {
      res.status(404).send({ error: "Day not found" });
    } else {
      //fetch remaining data: tasks
      let taskResults = await db(`SELECT * FROM tasks WHERE day_id=${dayId}`);
      // taskResults is an array with an object inside that gets added to days object
      days[0]["tasks"] = taskResults.data;
      //fetch remaining data: pomodoros
      let pomodoroResult = await db(
        `SELECT * FROM pomodoro WHERE day_id=${dayId}`
      );
      days[0]["sessions"] = pomodoroResult.data;
      res.send(days[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new day

router.post("/", async function (req, res, next) {
  let getDay = new Date();
  var dd = String(getDay.getDate()).padStart(2, "0");
  var mm = String(getDay.getMonth() + 1).padStart(2, "0");
  var yyyy = getDay.getFullYear();
  let today = dd + "." + mm + "." + yyyy;

  try {
    let day = `SELECT * FROM days WHERE date="${today}"`;
    let dayExist = await db(day);
    if (dayExist.data.length !== 0) {
      res.send({ error: "Day already exists." });
    } else {
      await db(`INSERT INTO days (date)
      VALUES ("${today}")`);
      let result = await db(`SELECT * FROM days WHERE date="${today}"`);
      let days = result.data;
      res.status(201).send(days);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
