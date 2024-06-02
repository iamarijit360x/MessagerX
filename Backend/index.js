const express = require('express');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authCheck, authenticateUser } = require('./middlewares/authCheck');
const routes = require('./routes/routes');

const app = express();
const server = http.createServer(app);
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL // Allow requests from this origin
}));

// Routes
app.use(routes);

// Socket.IO configuration
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});
const users={}
// Socket.IO event handling
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        try {
            const verified = jwt.verify(token, process.env.SECRET);
            const email=jwt.decode(token,process.env.SECRET)
            users[email.username]=socket.id
                console.log(`User connected: ${socket.id}`);

            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    } else {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    socket.on('sendMessage', (recipientId, msg) => {

        io.to(users[recipientId]).emit('sendMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// MongoDB connection
mongoose.connect(process.env.DB_URL);

// Server listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
