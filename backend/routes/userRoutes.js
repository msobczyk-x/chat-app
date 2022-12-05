const express = require("express");
const {
  registerUser,
  loginUser,
  saveHobby,
  home,
  logout,
} = require("../controllers/userControllers");
const sessionChecker = require("../utils/sessionChecker");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/saveHobby").get(saveHobby);
router.route("/", sessionChecker).get(home);
router.route("/logout", sessionChecker).get(logout);

module.exports = router;