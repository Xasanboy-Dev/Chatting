import dotenv from "dotenv";
dotenv.config();
import { Socket, Server } from "socket.io";
import express from "express";
import cors from "cors";
import user from "./../router/user";
import chat from "./../router/chat";
import http from "http"
import socketIO from "socket.io"

const server = express()
const app = http.createServer(server)

const io = new socketIO.Server(app, {
  cors: {
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
  }
})
const PORT = process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/user", user);
server.use("/chat", chat);



io.on('connection', (socket) => {
  console.log(socket.id + ' user connected');
  socket.emit("message", "Hello")
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
