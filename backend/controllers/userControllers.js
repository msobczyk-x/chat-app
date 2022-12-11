const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  } else {
    const user = await User.create({
      username,
      password,
      newUser: true,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
        newUser: user.newUser,
        hobby: user.hobby,
      });
    } else {
      res.status(400).json({
        message: "Error",
      });
    }
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    session = req.session;
    session.authenticated = true;
    session.userid = user.id;

    console.log(req.session);
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
      newUser: user.newUser,
      hobby: user.hobby,
    });
  } else {
    res.status(400).json({
      message: "Wrong username or password",
    });
  }
};
const logout = async function (req, res) {
  if (req.session.userid) {
    req.session.userid = null;
  }
  req.session.save(function (err) {
    if (err)
      res.status(400).json({
        message: err,
      });
    else
      res.status(200).json({
        message: "logged out succesfully",
      });

    req.session.regenerate(function (err) {
      if (err) next(err);
    });
  });
};

const saveHobby = async function (req, res) {
  username = req.body.username;
  hobby = req.body.hobby;
  const foundUser = await User.findOne({ username: username });

  if (foundUser) {
    foundUser.hobby = hobby;

    foundUser.save((err, updatedUser) => {
      if (err) res.status(401).json({ message: error });
      else {
        res.status(200).json({ updatedUser });
      }
    });
  } else {
    res.status(401).json({
      message: "no user found",
    });
  }
};

const getUserHobby = async function (req, res) {
  const username = req.params.username;

  const foundUser = await User.findOne({ username: username });

  if (foundUser) {
    res.status(200).json({
      hobby: foundUser.hobby,
    });
  } else {
    res.status(401).json({
      message: "no user found",
    });
  }
};

const getUserChats = async function (req, res) {
  const username = req.body.username;
  const data = await Chat.find({ username: username });

  roomMessages = data;
  if (data) {
    res.status(200).json({ roomMessages });
  } else {
    res.status(401).json({ message: "no user found" });
  }
};
const home = async function (req, res) {
  console.log(req.session);
};

module.exports = {
  registerUser,
  loginUser,
  saveHobby,
  home,
  logout,
  getUserHobby,
  getUserChats,
};
