import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { connect } from "./config.js";
import { chatModel } from "./chat.schema.js";

const app = express();
const server = http.createServer(app);

// Serve static files
app.use(express.static('public'));

// Create Socket Server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Use Socket Events
io.on("connection", (socket) => {
    console.log("Connection is established");
    socket.on("join", (data) => {
        socket.username = data;
        chatModel.find().sort({ timeStamp: 1 }).limit(50)
            .then(messages => {
                socket.emit("load_messages", messages);
            }).catch(err => {
                console.log(err);
            });
    });

    socket.on('new_message', (message) => {
        let userMessage = {
            username: socket.username,
            message: message
        }
        const newChat = new chatModel({
            username: socket.username,
            message: message,
            timeStamp: new Date()
        });
        newChat.save();
        socket.broadcast.emit("broadcast_message", userMessage);
    });

    socket.on("disconnect", () => {
        console.log("Connection is disconnected");
    });
});

server.listen(3000, () => {
    console.log("App is listening on 3000");
    connect();
});
