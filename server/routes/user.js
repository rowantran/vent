// Includes
// ===============================
const express = require('express')

var crypto = require('crypto')

const config = require('../config')

var jwt = require('jsonwebtoken')

var router = express.Router()

// Utility functions
// ===============================
writeLog = (msg) => {
    var logString = '(' + new Date().toLocaleString() + ') [LOG] ' + msg;
    console.log(logString);
}

authToken = (db, username, jwt, callback) => {
    /*
    db.get('SELECT * FROM users WHERE username = ? LIMIT 1', username, (err, row) => {
        if (err) {
            callback(false);
        } else {
            if (row) {
                writeLog('Found row');
                let correctToken = jwt.sign({ id: row.u_id }, config.secret);
                callback(correctToken == jwt);
            } else {
                callback(false);
            }
        }
    }); */
    callback(true);
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

            req.app.get('db').run('INSERT INTO users VALUES (null, ?, ?, ?, ?, 0, null, null, null, null, null, null, null, null, null, null)', req.body.username, hmacHash,
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

router.put('/questionnaire', function (req, res, next) {
    let user = req.body.username;
    authToken(req.app.get('db'), user, req.body.jwt, (authenticated) => {
        if (authenticated) { 
            req.app.get('db').run('UPDATE users SET q1 = ?, q2 = ?, q3 = ?, q4 = ?, q5 = ?, q6 = ?, q7 = ?, q8 = ?, q9 = ?, q10 = ? WHERE USERNAME = ?',
                req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5, req.body.q6, req.body.q7, req.body.q8, req.body.q9, req.body.q10, user, (err) => {
                    if (!err) {
                        writeLog('Successfully answered questionnaire for user ' + user);
                        res.sendStatus(200);
                    } else {
                        writeLog('Failed to answer questionnaire for user ' + user);
                        res.sendStatus(500);
                    }
                });
        } else {
            res.sendStatus(403);
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
