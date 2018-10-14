// Includes
// ===============================
const express = require('express')

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

getID = (db, username, callback) => {
    db.get('SELECT * FROM users WHERE username = ? LIMIT 1', username, (err, row) => {
        if (err) {
            callback(-1);
        } else {
            if (row) {
                callback(row.u_id);
            } else {
                callback(-1);
            }
        }
    })
}

// Routing
// ===============================
router.post('/join', (req, res) => {
    let user = req.body.username;
    authToken(req.app.get('db'), user, req.body.jwt, (auth) => {
        if (auth) {
            getID(req.app.get('db'), user, (uid) => {
                req.app.get('db').run('INSERT INTO pool VALUES (null, ?, ?)', req.body.venter, uid, (err) => {
                    if (!err) {
                        writeLog("Successfully added user " + user + " to pool");
                        res.sendStatus(200);
                    } else {
                        writeLog("Failed to add user " + user + " to pool");
                        res.sendStatus(500);
                    }
                });
            })
        } else {
            res.sendStatus(403);
        }
    });
});

module.exports = router