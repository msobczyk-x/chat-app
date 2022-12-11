const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouters = require("./routes/userRoutes");
const userResources = require("./routes/userResources");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db.js");
const app = express();
const Socket = require("./models/socketModel");
const ChatRoom = require("./models/chatModel");
const saveMessagesToDB = require("./utils/serverControlles");
const cookie = require("cookie");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.options("*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.send();
});



connectDB();
const oneDay = 1000 * 60 * 60 * 24;

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  cookie: { maxAge: oneDay },
  saveUninitialized: false,
});
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("./static/"));
app.use("/api/auth", userRouters);
app.use("/api", userResources);
app.use(notFound);
app.use(errorHandler);
app.use(cookieParser());

let hobby = [];
let users = [];
let room = "";
let messages = {};
let usernames = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  let username = "";
  socket.emit("connected");

  // console.log(socket.handshake.headers.cookie);
  console.log(socket.handshake.headers.cookie);
  if (Object.values(usernames).includes(username)) {
    console.log("asd");
  }

  users.push({ socket: socket, status: 0 });
  hobby.push({ id: socket.id, hobby: ["asd"] });
  console.log(users);

  let freeUserLen = users.filter(
    (obj) => obj.hasOwnProperty("status") && obj.status === 0
  ).length;
  if (freeUserLen >= 2) {
    socket.emit("connection");
  }

  socket.on("sendHobby", (hobby) => {
    hobby.push({
      id: socket.id,
      hobby: hobby,
    });
  });

  socket.on("findMatch", () => {
    const userHobby = hobby.find((hobby) => hobby.id === socket.id);
    if (!userHobby) return;
    hobby = hobby.filter((hobby) => hobby.id !== socket.id);

    const bestMatch = hobby
      .map((res) => ({
        res,
        matches: res.hobby.reduce(
          (acc, cur) => acc + (userHobby.hobby.includes(cur) ? 1 : 0),
          0
        ),
      }))
      .reduce((acc, cur) => (acc.matches > cur.matches ? acc : cur));

    if (bestMatch.res.id !== socket.id) {
      socket.emit("match", `${bestMatch.res.id} ${socket.id}`);
      io.to(bestMatch.res.id).emit("match", `${bestMatch.res.id} ${socket.id}`);

      users = users.map((obj) => {
        if (obj.socket.id === socket.id || obj.socket.id === bestMatch.res.id) {
          return {
            ...obj,
            status: 1,
          };
        }
      });
    }
  });

  socket.on("register username", (newUsername) => {
    username = newUsername;
    usernames[socket.id] = newUsername;
  });

  socket.on("chat message", (message, username) => {
    if (messages[room]) {
      messages[room].push({
        username: username,
        message: message,
        date: new Date(),
      });
    } else {
      messages[room] = [
        {
          username: username,
          message: message,
          date: new Date(),
        },
      ];
    }
    socket.to(room).emit("chat message", username, message);
  });

  socket.on("join room", (newRoom, sendMessage) => {
    socket.join(newRoom);
    room = newRoom;
    sendMessage(`Joined room:'${room}'`);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
    socket.to(room).emit("user disconnected");
    saveMessagesToDB(usernames[socket.id], messages[room],room);
    hobby = hobby.filter((hobby) => hobby.id !== socket.id);
    users = users.filter((user) => user.socket.id != socket.id);
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
