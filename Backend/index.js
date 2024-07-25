const express = require('express');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const User=require('./models/UserModel')
const app = express();
const server = http.createServer(app);
const setupSocketIO=require('./config/socket')
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL // Allow requests from this origin
}));


app.use(routes);

setupSocketIO(server); // Call the function and pass the server instance

mongoose.connect(process.env.DB_URL);

// Server listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    //console.log(`Server is listening on port ${PORT}`);
});
