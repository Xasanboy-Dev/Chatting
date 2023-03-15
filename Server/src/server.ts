import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import user from "./../router/user";
import chat from "./../router/chat";

const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/user", user);
server.use("/chat", chat);

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});

