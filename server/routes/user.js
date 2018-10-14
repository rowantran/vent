// Includes
// ===============================
const express = require('express')

var crypto = require('crypto')

const config = require('../config')

var jwt = require('jsonwebtoken')

var router = express.Router()

// Utility function
// ===============================
writeLog = (msg) => {
    var logString = '(' + new Date().toLocaleString() + ') [LOG] ' + msg;
    console.log(logString);
}

// Routing
// ===============================
router.post('/create', function (req, res, next) {
    console.log('Username: ' + req.body.username);
    console.log('Email: ' + req.body.email);
    console.log('Password: ' + req.body.password);
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
            writeLog('Failed to generate salt');
            res.sendStatus(500);
        } else {
            writeLog('Successfully generated salt');

            let salt = buf.toString('hex');

            let hmac = new crypto.createHmac('sha256', buf.toString('hex'));
            hmac.update(req.body.password);
            let hmacHash = hmac.digest('hex');

            req.app.get('db').run('INSERT INTO users VALUES (null, ?, ?, ?, ?, 0)', req.body.username, hmacHash,
                salt, req.body.email, (err) => {
                    if (!err) {
                        writeLog('Successfully created user ' + req.body.username);
                        res.sendStatus(201);
                    } else {
                        writeLog('Failed to create user ' + req.body.username);
                        res.sendStatus(500);
                    }
                }
            );
        }
    });
});

router.post('/login', function (req, res, next) {
    req.app.get('db').get('SELECT * FROM users WHERE username = ?', req.body.username, (err, row) => {
        if (!err) {
            if (row) {
                writeLog('Found user ' + req.body.username);

                let hmac = new crypto.createHmac('sha256', row.salt);
                hmac.update(req.body.password);
                let givenHash = hmac.digest('hex');

                if (row.hmac == givenHash) {
                    writeLog('Correct password for user ' + req.body.username);
                    let token = jwt.sign({ id: row.u_id }, config.secret);
                    res.status(200).send(JSON.stringify({ jwt: token }));
                } else {
                    res.sendStatus(401);
                }
            } else {
                writeLog('Invalid user ' + req.body.username);
                res.sendStatus(404);
            }
        } else {
            writeLog('Error logging in user');
            res.sendStatus(500);
        }
    });
});
    
router.get('/', function (req, res, next) {
    req.app.get('db').all('SELECT * FROM users', function (err, rows) {
        if (!err) {
            res.status(200).send(rows)
        } else {
            console.log('error')
            res.status(500)
        }
    });
})

module.exports = router
