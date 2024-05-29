const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};
require('dotenv').config()
app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('register', (username) => {
        users[username] = socket.id;
        console.log(`User registered: ${username}`);
    });

    socket.on('send_message', ({ recipient, message }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('receive_message', {
                sender: socket.id,
                message
            });
        } else {
            socket.emit('error', 'User not found');
        }
    });

    socket.on('add_contact', ({ user, contact }) => {
        if (users[contact]) {
            socket.emit('contact_added', { user, contact });
        } else {
            socket.emit('error', 'Contact not found');
        }
    });

    socket.on('disconnect', () => {
        for (const [username, id] of Object.entries(users)) {
            if (id === socket.id) {
                delete users[username];
                console.log(`User disconnected: ${username}`);
                break;
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
