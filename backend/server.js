const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouters = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db.js");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


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
app.use(cors());
app.use("/api/auth", userRouters);
app.use(notFound);
app.use(errorHandler);
app.use(cookieParser());



// const mongoDB = "mongodb://127.0.0.1:27017/UserDB";
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: String,
//   password: String,
// });
// userSchema.plugin(passportLocalMongoose);
// const User = mongoose.model("UserModel", userSchema);

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
// });

// app.post("/login", (req, res) => {
//   const username = req.body.email;
//   const password = req.body.password;
//   console.log(username, password);

//   const user = new User({
//     username: username,
//     password: password,
//   });
//   req.login(user, (err) => {
//     if (err) console.log(err);
//     else {
//       passport.authenticate("local")(req, res, () => {
//         console.log("succes");
//         res.redirect("/");
//       });
//     }
//   });
//   // User.find({ email: email }, (err, foundUser) => {
//   //   if (!err) {
//   //     if (foundUser.length > 0) {
//   //       console.log(foundUser);
//   //       if (foundUser[0].password != password) {
//   //         console.log("wrong password");
//   //       } else {
//   //         console.log("user in db");
//   //       }
//   //     } else if (foundUser.length == 0) {
//   //       console.log("no user in db");
//   //     }
//   //   }
//   // });
// });

// app.post("/register", (req, res) => {
//   username = req.body.email;
//   password = req.body.password;
//   console.log(username, password);

//   User.register({ username: username }, password, (err, user) => {
//     if (err) {
//       console.log(err);
//       res.redirect("/register");
//     } else {
//       passport.authenticate("local")(req, res, () => {
//         console.log("succes");
//         res.redirect("/login");
//       });
//     }
//   });

// User.find({ email: email }, (err, foundUser) => {
//   if (!err) {
//     if (foundUser.length != 0) {
//       console.log("user already in db");
//     } else {
//       const user = new User({
//         email: email,
//         password: password,
//       });
//       user.save();
//     }
//   }
// });
// });

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
  const session = socket.request.session;
  if (session && session.authenticated) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

io.on("connection", (socket) => {
  let username = "";
  let room = "";

  socket.on("chat message", (message) => {
    // if (room === "") socket.broadcast.emit("chat message", msg, username);
    socket.broadcast.emit("chat message", username, message);
  });
  socket.on("register username", (newUsername) => {
    username = newUsername;
  });
  socket.on("join room", (newRoom, sendMessage) => {
    console.log("asd");
    socket.join(room);
    room = newRoom;
    sendMessage(`Joined room:'${room}'`); 
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
