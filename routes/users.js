var express = require('express');
const { BCRYPT_WORK_FACTOR } = require('../config');
const bcrypt = require('bcrypt');
var router = express.Router();
const { ensureSameUser, ensureSameUserP } = require('../middleware/guards');
const db = require("../model/helper");


/**
 * Get all users
 **/

router.get('/', async function(req, res, next) {
    let sql = 'SELECT * FROM users ORDER BY username';

    try {
        let results = await db(sql);
        let users = results.data;
        users.forEach(u => delete u.password);  // don't return passwords
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


/**
 * Get one user.
 * A user can only see his/her own profile info.
 **/

router.get('/:userId', ensureSameUserP, async function(req, res, next) {
    let { userId } = req.params;
    let sql = 'SELECT * FROM users WHERE id = ' + userId;
    
    try {
        let results = await db(sql);
        // We know user exists because he/she is logged in!
        let user = results.data[0];
        delete user.password;  // don't return the password
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

/**
 * Post new user. (code already written in auth.js route)
 * Register a new user.
 **/

//  router.post('/register', async function(req, res, next) {
//     let { username, password, email} = req.body;
//     let hashPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

//     let sql = `
//       INSERT INTO users (username, password, email)
//       VALUES ('${username}', '${hashPassword}', '${email}')
//   `;
    
//     try {
//         await db(sql);
//         let result = await db(`SELECT * FROM users`); 
//         let users = result.data;
//         res.status(201).send(users);
//       } catch (err) {
//         res.status(500).send({ error: err.message });
//       }
//     });





module.exports = router;