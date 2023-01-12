const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const userRouters = require("./routes/userRoutes");
const userResources = require("./routes/userResources");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db.js");
const {
  saveMessagesToDB,
  saveUserPairsToDB,
} = require("./utils/serverControlles");
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
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
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
let users_status = {};
let user_pairs = {};
let pair = "";
let acceptsPair = {};
let currentPair = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  let username = "";
  socket.emit("connected");
  // hobbys.push({ id: socket.id, hobby: ["asd"] });
  // console.log(socket.handshake.headers.cookie);
  // if (Object.values(usernames).includes(username)) {
  //   console.log("asd");
  // }
  setInterval(() => {
    socket.emit("users_status", users_status);
  }, 60000);

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

    if (bestMatch.matches >= 0 && bestMatch.res.id !== socket.id) {
      pair = bestMatch.res.username;
      currentPair[pair] = userHobby.username;
      currentPair[userHobby.username] = pair;
      // user_pairs[userHobby.username]
      //   ? user_pairs[userHobby.username].push(pair)
      //   : (user_pairs[userHobby.username] = [pair]);

      // user_pairs[pair]
      //   ? user_pairs[pair].push(userHobby.username)
      //   : (user_pairs[pair] = [userHobby.username]);

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
    users_status[username] = "online";
    // socket.id = id;
    // console.log(hobby);
    users.push({ socket: socket, status: 0 });
    hobbys.push({
      id: socket.id,
      username: newUsername,
      hobby: hobby,
    });
    socket.emit("username registered");
    // console.log(user);
    // usernames[socket.id] = newUsername;
    // console.log(usernames);
  });

  socket.on("chat message", (message, user) => {
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
      socket.to(room).emit("accept pair");
      socket.emit("accept pair");
    }
    socket.to(room).emit("chat message", user, message);
  });

  socket.on("accept result", (nickname, result) => {
    acceptsPair[nickname] = result;
    if (result && acceptsPair[currentPair[nickname]]) {
      console.log("paired");
      user_pairs[nickname]
        ? user_pairs[nickname].push(currentPair[nickname])
        : (user_pairs[nickname] = [currentPair[nickname]]);

      user_pairs[currentPair[nickname]]
        ? user_pairs[currentPair[nickname]].push(nickname)
        : (user_pairs[currentPair[nickname]] = [nickname]);
    } else if (acceptsPair[currentPair[nickname]] !== null) {
      if (!result || !acceptsPair[currentPair[nickname]]) {
        socket.emit("end chat");
        socket.to(room).emit("end chat");
        console.log("not paired");
      }
    }

    // if (acceptsPair[currentPair[nickname]] !== null) {
    //   if (result && acceptsPair[currentPair[nickname]]) {
    //     console.log("paired");
    //     user_pairs[nickname]
    //       ? user_pairs[nickname].push(currentPair[nickname])
    //       : (user_pairs[nickname] = [currentPair[nickname]]);

    //     user_pairs[currentPair[nickname]]
    //       ? user_pairs[currentPair[nickname]].push(nickname)
    //       : (user_pairs[currentPair[nickname]] = [nickname]);
    //   } else {
    //     socket.emit("end chat");
    //     socket.to(room).emit("end chat");
    //     console.log("not paired");
    //   }
    // } else {
    //   console.log("pair not decided yet");
    // }
  });

  socket.on("join room", (newRoom, sendMessage) => {
    socket.join(newRoom);
    room = newRoom;
    // sendMessage(`Joined room:'${room}'`);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
    users_status[
      username
    ] = `${new Date().toLocaleDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    console.log(users_status[username]);
    socket.to(room).emit("user disconnected");
    // console.log(user_pairs);
    saveMessagesToDB(username, messages[room], room, currentPair[username]);
    // saveMessagesToDB(currentPair[username], messages[room], room, username);
    saveUserPairsToDB(username, user_pairs);
    pair = "";
    acceptsPair[username] = null;
    acceptsPair[currentPair[username]] = null;
    currentPair[username] = null;
    hobbys = hobbys.filter((hobby) => hobby.id !== socket.id);
    users = users.filter((user) => user.socket.id != socket.id);
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
