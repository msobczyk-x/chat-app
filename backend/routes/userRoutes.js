const express = require("express");
const {
  registerUser,
  loginUser,
  saveHobby,
  home,
  logout,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(home);
router.route("/logout").get(logout);

module.exports = router;