const express = require('express');
const cors = require('cors');
const URL = require('./config');
const mongoose = require('mongoose');
const userRoutes = require('./routes/useRoutes');
const messageRoutes = require('./routes/messagesRoute');
const groupRoutes = require('./routes/groupRoutes');
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/groups", groupRoutes);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db Connection Success");
    })
    .catch((err) => {
        console.log("Error: " + err.message);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: URL,
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        global.onlineUsers.set(userId, socket.id); 
    });
    socket.on("send-msg", data => {
        console.log("Data recibida en el evento 'send-msg':", data);
        const sendUserSocket = global.onlineUsers.get(data.to); 
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
    socket.on("send-group-msg", (data) => {
        console.log("Mensaje grupal recibido:", data);
        // Envía el mensaje a todos los usuarios conectados (grupo)
        io.emit("group-msg", data);
    });
});
