import { io } from 'socket.io-client';
const URL = 'ws://localhost:7070';

export const socket = io(URL);
socket.connect()

socket.on('message', (data) => {
    console.log(data);
})