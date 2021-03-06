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

var users = [];
io.on('connection', (socket) => {
    socket.on('enter', (username) => {
        users.push(username);
        setInterval(() => {
            if (users.length > 1) {
                socket.emit('ready', 'ssdsI-41');
            }
        }, 1000);
    });

    socket.on('message', (msg) => {
        io.emit('message', msg, { for: 'everyone' });
    });

    socket.on('disconnect', (reason) => {
        console.log('User left');
    });
});