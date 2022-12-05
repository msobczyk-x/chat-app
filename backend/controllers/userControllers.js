const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  } else {
    hobby = [{ name: "a", checked: false }];
    const user = await User.create({
      username,
      password,
      newUser: true,
      hobby: hobby,
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

const saveHobby = async function (req, res) {
  console.log(req.session);
  if (req.session.authenticated) {
    res.status(200).json({
      message: req.session,
    });
  } else {
    res.status(400).json({
      message: "not LoggedIn",
    });
  }
};

const home = async function (req, res) {
  console.log(req.session);
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
module.exports = { registerUser, loginUser, saveHobby, home, logout };
