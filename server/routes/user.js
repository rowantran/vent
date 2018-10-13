// Includes
// ===============================
const express = require('express')

const config = require('../config')

var router = express.Router()


// Routing
// ===============================
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
