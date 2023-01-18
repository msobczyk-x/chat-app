const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouters = require("./routes/userRoutes");
const userResources = require("./routes/userResources");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db.js");
const {
  saveMessagesToDB,
  saveUserPairsToDB,
} = require("./utils/serverControlles");
const cors = require("cors");

const app = express();
const http = require("http").Server(app);

// const server = http.createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.options("*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.send();
});
app.use(cors());

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
let freeUserLen = 0;
let usersStatus = {};
let userPairs = {};
let pair = "";
let acceptsPair = {};
let currentPair = {};
let previousPair = {};

io.on("connection", (socket) => {
  // const userId = socket.handshake.query.userId;
  // socket.join(userId);

  console.log("a user connected");
  let username = "";
  socket.emit("connected");

  setInterval(() => {
    socket.emit("usersStatus", usersStatus);
  }, 60000);

  socket.on("findMatch", () => {
    const userHobby = users.find((user) => user.socket.id === socket.id);
    if (!userHobby) console.log("sad");
    let prevPair = previousPair[username]
      ? previousPair[username].username
      : false;

    let usersTmp = users.filter(
      (user) => user.username !== prevPair && user.username !== username
    );

    console.log(usersTmp);
    if (usersTmp.length === 0) {
      socket.emit("tryAgain");
    }

    const bestMatch = usersTmp
      .map((res) => ({
        res,
        matches: res.hobby.reduce(
          (acc, cur) => acc + (userHobby.hobby.includes(cur) ? 1 : 0),
          0
        ),
      }))
      .reduce((acc, cur) => (acc.matches >= cur.matches ? acc : cur), 0);

    if (bestMatch.matches >= 0) {
      pair = bestMatch.res;
      currentPair[pair.username] = userHobby;
      currentPair[userHobby.username] = pair;
      socket.emit("match", `${bestMatch.res.socket.id} ${socket.id}`);
      socket
        .to(bestMatch.res.socket.id)
        .emit("match", `${bestMatch.res.socket.id} ${socket.id}`);
      users.forEach((user) => {
        if (
          user.socket.id === socket.id ||
          user.socket.id === bestMatch.res.socket.id
        ) {
          user.status = 1;
        }
      });
    } else {
      socket.emit("tryAgain");
    }
  });

  socket.on("tryToFindMatch", () => {
    let prevPair = previousPair[username]
      ? previousPair[username].username
      : false;
    freeUserLen = users.filter(
      (user) =>
        user.username !== username &&
        user.hasOwnProperty("status") &&
        user.status === 0 &&
        user.username !== prevPair
    ).length;
    console.log(freeUserLen);
    // console.log(freeUserLen);
    // console.log(users);

    let currentUser = users.filter((user) => user.socket.id === socket.id);
    if (currentUser[0].status === 0) {
      if (freeUserLen >= 1) {
        socket.emit("connection");
      } else {
        setTimeout(() => {
          console.log(username + " trying...");
          socket.emit("tryAgain");
        }, 5000);
      }
    }
  });

  socket.on("register username", (newUsername, hobby) => {
    username = newUsername;
    usersStatus[username] = "online";
    // users.push({ username: newUsername, socket: socket, status: 0 });
    users.push({
      socket: socket,
      username: newUsername,
      hobby: hobby,
      status: 0,
    });
    acceptsPair[username] = null;
    // console.log(users[0]);
    // console.log("\n\n\n\n");
    socket.emit("username registered");
  });

  socket.on("chat message", (message, user) => {
    let tmpUser = users.find((user) => user.socket.id === socket.id);
    if (tmpUser.status === 0) {
      return;
    }
    if (messages[room]) {
      messages[room].push({
        username: user,
        message: message,
        date: new Date(),
      });
    } else {
      messages[room] = [
        {
          username: user,
          message: message,
          date: new Date(),
        },
      ];
    }
    if (messages[room].length === 5) {
      socket.to(currentPair[username].socket.id).emit("accept pair");
      socket.emit("accept pair");
    }
    socket
      .to(currentPair[username].socket.id)
      .emit("chat message", user, message);
    // socket.emit("chat message", user, message);
  });

  socket.on("accept result", (nickname, result) => {
    acceptsPair[nickname] = result;

    if (!result) {
      socket.emit("end chat");
      socket.to(currentPair[username].socket.id).emit("end chat");
      console.log("not paired");
    } else if (result && acceptsPair[currentPair[nickname].username]) {
      console.log("paired");
      userPairs[nickname]
        ? userPairs[nickname].push(currentPair[nickname].username)
        : (userPairs[nickname] = [currentPair[nickname].username]);

      userPairs[currentPair[nickname].username]
        ? userPairs[currentPair[nickname].username].push(nickname)
        : (userPairs[currentPair[nickname].username] = [nickname]);
    }
  });

  socket.on("join room", (newRoom, sendMessage) => {
    socket.join(newRoom);
    room = newRoom;
    // sendMessage(`Joined room:'${room}'`);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
    usersStatus[
      username
    ] = `${new Date().toLocaleDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    // console.log(users_status[username]);
    let tmpUser = users.find((user) => user.socket.id === socket.id);
    if (tmpUser && tmpUser.status === 1) {
      socket.to(currentPair[username].socket.id).emit("user disconnected");
      saveMessagesToDB(
        username,
        messages[room],
        room,
        currentPair[username].username
      );
      saveUserPairsToDB(username, userPairs[username]);
      // acceptsPair[currentPair[username].socket.username] = null;
    }
    // console.log(user_pairs);
    // saveMessagesToDB(currentPair[username], messages[room], room, username);
    pair = "";
    previousPair[username] = currentPair[username];
    acceptsPair[username] = null;
    currentPair[username] = null;
    // hobbys = hobbys.filter((hobby) => hobby.id !== socket.id);
    users = users.filter((user) => user.socket.id != socket.id);
  });
});
http.listen(3000, () => {
  console.log("listening on *:3000");
});
