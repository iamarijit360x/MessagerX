const express = require('express');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authCheck, authenticateUser } = require('./middlewares/authCheck');
const routes = require('./routes/routes');
const { Cipher } = require('crypto');
const User=require('./models/UserModel')
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
//const users={}
const users=new Map()
// setInterval(()=>console.log(users),2500)
// Socket.IO event handling
io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        try {
            const verified = jwt.verify(token, process.env.SECRET);
            const email=jwt.decode(token,process.env.SECRET)
            socket.username=email.username
            //users[email.username]=socket.id
            users.set(email.username,socket.id)
            
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
            console.log(users)

            const user=await User.findOne({username:socket.username})
    
            if( user.temporaryMessages.length>0){
                for(let i=0;i<user.temporaryMessages.length;i++)
                    {
                        console.log(user.temporaryMessages[i])
                        io.to(socket.id).emit('sendMessage', user.temporaryMessages[i]);

                    }
                    user.temporaryMessages=[]
                    await user.save()
            }
            
          } catch (error) {
            
          }
            

    socket.on('sendMessage', async (recipientId, msg) => {
        const sid=(users.get(recipientId))
        if(sid===undefined)
            {
                const user=await User.findOne({username:recipientId})
                user.temporaryMessages.push(msg)
                user.save()
            }
        io.to(sid).emit('sendMessage', msg);
        // console.log(msg,recipientId)
    });

    socket.on('disconnect', () => {
        users.delete(socket.username)

    });
});

// MongoDB connection
mongoose.connect(process.env.DB_URL);

// Server listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    //console.log(`Server is listening on port ${PORT}`);
});
