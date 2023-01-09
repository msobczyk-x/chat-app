const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const userRouters = require("./routes/userRoutes");
const userResources = require("./routes/userResources");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db.js");
const saveMessagesToDB = require("./utils/serverControlles");
const cors = require("cors");
const { emit } = require("./models/userModel");
const { logout } = require("./controllers/userControllers");

const app = express();
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
  saveUninitialized: true,
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

let hobbys = [];
let users = [];
let room = "";
let messages = {};
let usernames = {};
let freeUserLen = 0;

io.on("connection", (socket) => {
  console.log("a user connected");
  let username = "";
  socket.emit("connected");
  // hobbys.push({ id: socket.id, hobby: ["asd"] });
  // console.log(socket.handshake.headers.cookie);
  // if (Object.values(usernames).includes(username)) {
  //   console.log("asd");
  // }

  socket.on("findMatch", () => {
    const userHobby = hobbys.find((hobby) => hobby.id === socket.id);
    if (!userHobby) return;
    hobbys = hobbys.filter((hobby) => hobby.id !== socket.id);

    const bestMatch = hobbys
      .map((res) => ({
        res,
        matches: res.hobby.reduce(
          (acc, cur) => acc + (userHobby.hobby.includes(cur) ? 1 : 0),
          0
        ),
      }))
      .reduce((acc, cur) => (acc.matches >= cur.matches ? acc : cur), 0);

    if (bestMatch.matches >= 1 && bestMatch.res.id !== socket.id) {
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
    } else {
      socket.emit("tryAgain");
    }
  });

  socket.on("tryToFindMatch", () => {
    freeUserLen = users.filter(
      (obj) => obj.hasOwnProperty("status") && obj.status === 0
    ).length;
    // console.log(freeUserLen);
    let currentUser = users.filter((user) => user.socket.id === socket.id);
    if (currentUser[0].status === 0) {
      if (freeUserLen >= 2) {
        socket.emit("connection");
      } else {
        setTimeout(() => {
          socket.emit("tryAgain");
        }, 5000);
      }
    }
  });

  socket.on("register username", (newUsername, id, hobby) => {
    username = newUsername;
    // socket.id = id;
    // console.log(hobby);
    users.push({ socket: socket, status: 0 });
    hobbys.push({
      id: socket.id,
      hobby: hobby,
    });
    socket.emit("username registered");
    // console.log(user);
    // usernames[socket.id] = newUsername;
    // console.log(usernames);
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
    if (messages[room].length > 20){
      console.log("emit accept pair");
    }
    socket.to(room).emit("chat message", username, message);
  });

  socket.on("join room", (newRoom, sendMessage) => {
    socket.join(newRoom);
    room = newRoom;
    // sendMessage(`Joined room:'${room}'`);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
    socket.to(room).emit("user disconnected");
    saveMessagesToDB(username, messages[room], room);
    hobbys = hobbys.filter((hobby) => hobby.id !== socket.id);
    users = users.filter((user) => user.socket.id != socket.id);
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
