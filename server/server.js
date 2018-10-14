// Constants/config
// =========================================
//
const express = require('express')
var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')

const config = require('./config')

// Initialization
// =========================================
var db = new sqlite3.Database(config.DB_FILE)

var user = require('./routes/user')

const app = express()
app.set('db', db)
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello'))
app.use('/user', user)

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))
