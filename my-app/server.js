import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

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

app.get("/api/rooms/:id", (req, res) => {
  const roomId = req.params.id;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get("users").values()],
        messages: [...rooms.get(roomId).get("messages").values()],
      }
    : { users: [], messages: [] };
  res.json(obj);
});

app.post("/api/rooms", (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map([])],
        ["messages", []],
      ])
    );
  }
  res.json();
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("ROOM:JOIN", ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    const users = [...rooms.get(roomId).get("users").values()];
    console.log(users);
    socket.to(roomId).emit("ROOM:SET_USERS", users);
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

server.listen(3000, (error) => {
  if (error) {
    throw Error(error);
  }
  console.log("Сервер запущен");
});
