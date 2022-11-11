const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/static", express.static("./static/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  let username = "";
  let room = ""

  socket.on("chat message", (message) => {
    // if (room === "") socket.broadcast.emit("chat message", msg, username);
    socket.broadcast.emit("chat message", username, message);
  });
  socket.on("register username", (newUsername) => {
    username = newUsername;
  });
  socket.on("join room", (newRoom, sendMessage) => {
    socket.join(room);
    room = newRoom;
    sendMessage(`Joined room:'${room}'`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
