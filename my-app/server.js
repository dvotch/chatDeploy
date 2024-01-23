import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { addUser } from "./src/Entities/Users.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

const rooms = new Map();

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ room, username }) => {
    socket.join(room);
    const { user, isExist } = addUser({ room, username });
    socket.emit("ROOM:MESSAGE", {
      data: { user: { username: "Admin" }, message: `Hey my love ${username}` },
    });

    socket.broadcast.to(user.room).emit("ROOM:MESSAGE", {
      data: { user: { username: "Admin" }, message: `${username} has join` },
    });
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...rooms.get(roomId).get("users").values()];
        socket.to(roomId).emit("ROOM:SET_USERS", users);
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Сервер запущен");
});
