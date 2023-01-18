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
const io = require("socket.io")(http);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");
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

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

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

let users = [];
let room = "";
let messages = {};
let freeUserLen = 0;
let usersStatus = {};
let userPairs = {};
let acceptsPair = {};
let currentPair = {};
let previousPair = {};

io.on("connection", (socket) => {
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
      (user) =>
        user.username !== prevPair &&
        user.username !== username &&
        user.status === 0
    );

    let count = 0;
    let best;
    usersTmp.length > 0
      ? usersTmp.forEach((user) => {
          let common = userHobby.hobby.filter((val) =>
            user.hobby.includes(val)
          );
          if (common.length > count) {
            count = common.length;
            best = user;
          }
        })
      : setTimeout(() => {
          console.log(username + " trying...");
          socket.emit("tryAgain");
        }, 5000);

    // const bestMatch = usersTmp
    //   .map((res) => ({
    //     res,
    //     matches: res.hobby.reduce(
    //       (acc, cur) => acc + (userHobby.hobby.includes(cur) ? 1 : 0),
    //       0
    //     ),
    //   }))
    //   .reduce((acc, cur) => (acc.matches >= cur.matches ? acc : cur), 0);

    if (count > 0) {
      currentPair[best.username] = userHobby;
      currentPair[userHobby.username] = best;
      socket.emit("match", `${best.socket.id} ${socket.id}`);
      socket.to(best.socket.id).emit("match", `${best.socket.id} ${socket.id}`);
      users.forEach((user) => {
        if (user.socket.id === socket.id || user.socket.id === best.socket.id) {
          user.status = 1;
        }
      });
    } else {
      setTimeout(() => {
        console.log(username + " trying...");
        socket.emit("tryAgain");
      }, 5000);
    }
  });

  socket.on("tryToFindMatch", () => {
    users.forEach((user) => {
      if (user.socket.id === socket.id) {
        user.status = 0;
      }
    });
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

    let currentUser = users.find((user) => user.username === username);
    if (currentUser && currentUser.status === 0) {
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
    users.push({
      socket: socket,
      username: newUsername,
      hobby: hobby,
      status: 1,
    });

    acceptsPair[username] = null;
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
  });

  socket.on("get pair", (username) => {
    const currentUser = users.find((user) => user.socket.id === socket.id);
    const userToPair = users.find((user) => user.username === username);
    currentPair[currentUser.username] = userToPair;
    currentPair[userToPair.username] = currentUser;
    socket.emit("match", `${userToPair.socket.id} ${socket.id}`);
    socket
      .to(best.socket.id)
      .emit("match", `${userToPair.socket.id} ${socket.id}`);
    users.forEach((user) => {
      if (
        user.socket.id === socket.id ||
        user.socket.id === userToPair.socket.id
      ) {
        user.status = 1;
      }
    });
  });

  socket.on("accept result", (nickname, result) => {
    acceptsPair[nickname] = result;

    if (!result) {
      socket.emit("end chat");
      socket.to(currentPair[username].socket.id).emit("end chat");
      console.log("not paired");
    } else if (result && acceptsPair[currentPair[nickname].username]) {
      console.log("paired");
      socket.emit("bothAccepted");
      socket.to(currentPair[username].socket.id).emit("bothAccepted");

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
    // let tmpUser = users.find((user) => user.socket.id === socket.id);
    if (currentPair[username]) {
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
    previousPair[username] = currentPair[username];
    acceptsPair[username] = null;
    currentPair[username] = null;
    users = users.filter((user) => user.socket.id != socket.id);
  });
});
http.listen(3000, () => {
  console.log("listening on *:3000");
});
