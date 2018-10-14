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
var match = require('./routes/match')

const app = express()
app.set('db', db)
app.use(bodyParser.json());

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => res.send('hello'))
app.use('/user', user)
app.use('/match', match);

http.listen(config.port, () => console.log(`Listening on port ${config.port}`))

io.on('connection', (socket) => {
    socket.on('enter', (interval) => {
        setInterval(() => {
            socket.emit('ready', '1');
        }, 5000);
    });

    socket.on('message', (msg) => {
        socket.emit('message', msg);
    })
});