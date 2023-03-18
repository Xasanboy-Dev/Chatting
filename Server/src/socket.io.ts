import cors from "cors";
import express, { Request, Response } from "express"
import http from "http"
import socketIO from "socket.io"
const PORT = 7070
const app = express()
const server = http.createServer(app)
const io = new socketIO.Server(+PORT, {
    cors: {
        origin: '*',
        methods: '*',
        allowedHeaders: '*'
    }
})

app.use(cors())

io.on('connection', (socket) => {
    console.log(socket.id + ' user connected');
    socket.emit("message", "Hello")
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on ws://localhost:' + PORT);
});