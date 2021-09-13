const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var users = {};

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    });

    socket.on('New-user-joined', name => {
        console.log('user joined', name);
        socket.broadcast.emit('user-joined', name);
        users[socket.id] = name;
        console.log(users)
    })
});

server.listen(8000, () => {
    console.log("hello world");
});