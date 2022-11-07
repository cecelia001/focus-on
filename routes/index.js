var express = require("express");
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');


/**
 * GET /
 **/

router.get('/', function(req, res) {
    res.send({ message: 'Welcome to the AuthAuth homepage! Try /users' });
});


/**
 *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! do need this?
 **/

router.get('/focus', ensureSameUser, function(req, res) {
    res.send({ message: 'Get started!' });
});


/* GET home page. */
//PREVIOUS CODE
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

module.exports = router;
