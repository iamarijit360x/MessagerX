const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { Server } = require('socket.io');

const users = new Map();

const setupSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            try {
                const verified = jwt.verify(token, process.env.SECRET);
                const email = jwt.decode(token, process.env.SECRET);
                socket.username = email.username;
                users.set(email.username, socket.id);
                next();
            } catch (error) {
                next(new Error('Authentication error'));
            }
        } else {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', async (socket) => {
        try {
            const user = await User.findOne({ username: socket.username });

            if (user.temporaryMessages.length > 0) {
                for (let i = 0; i < user.temporaryMessages.length; i++) {
                    io.to(socket.id).emit('sendMessage', user.temporaryMessages[i]);
                }
                user.temporaryMessages = [];
                await user.save();
            }
        } catch (error) {
            console.error(error);
        }

        socket.on('sendMessage', async (recipientId, msg) => {
            const sid = users.get(recipientId);
            if (sid === undefined) {
                const user = await User.findOne({ username: recipientId });
                user.temporaryMessages.push(msg);
                await user.save();
            } else {
                io.to(sid).emit('sendMessage', msg);
            }
        });

        socket.on('disconnect', () => {
            users.delete(socket.username);
        });
    });
};

module.exports = setupSocketIO;
