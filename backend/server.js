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
  getUserPairs,
  getUserStatus,
  saveUserStatus,
} = require("./utils/serverControlles");
const cors = require("cors");
 
const app = express();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
 
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
// app.use("/static", express.static("./static/"));
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
let allUserPairs = {};
let acceptsPair = {};
let currentPair = {};
let previousPair = {};
let usersPairsStatus = [];
io.on("connection", (socket) => {
  console.log("a user connected");
  let username = "";
 
  socket.emit("connected");
 
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
 
    if (count > 0) {
      currentPair[best.username] = userHobby;
      currentPair[userHobby.username] = best;
      console.log("matched");
      socket.emit(
        "match",
        `${best.socket.id} ${socket.id}`,
        userHobby.hobby,
        best.hobby
      );
      socket
        .to(best.socket.id)
        .emit(
          "match",
          `${best.socket.id} ${socket.id}`,
          userHobby.hobby,
          best.hobby
        );
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
    if (!currentPair[username]) {
      users.forEach((user) => {
        if (user.username === username) {
          user.status = 0;
        }
      });
    }
 
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
 
  socket.on("register username", async (newUsername, hobby) => {
    username = newUsername;
    // usersStatus[username] = "online";
    saveUserStatus(username, "online");
    allUserPairs[username] = await getUserPairs(username);
 
    // usersStatus.push(username);
    users.push({
      socket: socket,
      username: newUsername,
      hobby: hobby,
      status: 1,
    });
 
    // console.log(await getUserStatus(allUserPairs[username]));
    socket.emit("usersStatus", await getUserStatus(allUserPairs[username]));
    setInterval(async () => {
      socket.emit("usersStatus", await getUserStatus(allUserPairs[username]));
    }, 3000);
    acceptsPair[username] = null;
    socket.emit("username registered");
  });
 
  socket.on("chat message", (message, user) => {
    let tmpUser = users.find((user) => user.socket.id === socket.id);
    // if (tmpUser.status === 0) {
    //   return;
    // }
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
 
    if (!allUserPairs[username].includes(currentPair[username].username))
      if (messages[room].length === 5) {
        socket.to(currentPair[username].socket.id).emit("accept pair");
        socket.emit("accept pair");
      }
    currentPair[username]
      ? socket
          .to(currentPair[username].socket.id)
          .emit("chat message", user, message)
      : "";
  });
 
  socket.on("get pair", (nickname) => {
    const currentUser = users.find((user) => user.username === username);
    if (currentUser && !currentPair[username]) {
      const userToPair = users.find((user) => user.username === nickname);
      if (userToPair && !currentPair[userToPair.username]) {
        socket
          .to(userToPair.socket.id)
          .emit("accept conversation", username, userToPair.username);
        socket.emit("waiting for accept from pair", userToPair.username);
      } else socket.emit("user in conversation");
    }
  });
  socket.on("accepted conversation", (nickname) => {
    const currentUser = users.find((user) => user.username === username);
    const userToPair = users.find((user) => user.username === nickname);
    currentPair[currentUser.username] = userToPair;
    currentPair[userToPair.username] = currentUser;
 
    socket.emit(
      "match",
      `${userToPair.socket.id} ${socket.id}`,
      currentUser.hobby,
      userToPair.hobby
    );
    socket
      .to(userToPair.socket.id)
      .emit(
        "match",
        `${userToPair.socket.id} ${socket.id}`,
        currentUser.hobby,
        userToPair.hobby
      );
    users.forEach((user) => {
      if (
        user.socket.id === socket.id ||
        user.socket.id === userToPair.socket.id
      ) {
        user.status = 1;
      }
    });
  });

  socket.on("not accepted conversation", (nickname) => {
    const tmpUser = users.find((user) => user.username === nickname);

    socket.to(tmpUser.socket.id).emit("pair not accepted");
  });
 
  socket.on("accept result", (nickname, result) => {
    acceptsPair[nickname] = result;
 
    if (!result) {
      socket.emit("end chat");
      socket.to(currentPair[username].socket.id).emit("end chat");
      const currentUser = users.find((user) => user.socket.id === socket.id);
 
      previousPair[username] = currentPair[username];
      previousPair[currentPair[username].username] = currentUser;
 
      acceptsPair[currentPair[username].username] = null;
      acceptsPair[username] = null;
 
      currentPair[currentPair[username].username] = null;
      currentPair[username] = null;
 
      console.log("not paired");
    } else if (result && acceptsPair[currentPair[nickname].username]) {
      console.log("paired");
 
      userPairs[nickname]
        ? userPairs[nickname].push(currentPair[nickname].username)
        : (userPairs[nickname] = [currentPair[nickname].username]);
 
      userPairs[currentPair[nickname].username]
        ? userPairs[currentPair[nickname].username].push(nickname)
        : (userPairs[currentPair[nickname].username] = [nickname]);
      saveUserPairsToDB(username, userPairs[username]);
      saveUserPairsToDB(
        currentPair[nickname].username,
        userPairs[currentPair[nickname].username]
      );
 
      socket.emit("bothAccepted");
      socket.to(currentPair[username].socket.id).emit("bothAccepted");
    }
  });
 
  socket.on("join room", (newRoom, sendMessage) => {
    socket.join(newRoom);
    room = newRoom;
    // sendMessage(`Joined room:'${room}'`);
  });
 
  socket.on("disconnect", function () {
    console.log("user disconnected");
    saveUserStatus(
      username,
      `${new Date().toLocaleDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    );
 
    if (currentPair[username]) {
      socket.to(currentPair[username].socket.id).emit("user disconnected");
      currentPair[currentPair[username].username] = null;
      saveMessagesToDB(
        username,
        messages[room],
        room,
        currentPair[username].username
      );
      // acceptsPair[currentPair[username].socket.username] = null;
    }
    // saveMessagesToDB(currentPair[username], messages[room], room, username);
    previousPair[username] = currentPair[username];
    acceptsPair[username] = null;
    currentPair[username] = null;
    users = users.filter((user) => user.socket.id != socket.id);
  });
});
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
 