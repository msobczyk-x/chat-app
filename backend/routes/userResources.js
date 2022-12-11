const express = require("express");
const {
  getUserHobby,
  saveHobby,
  getUserChats,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/saveHobby").post(saveHobby);
router.route("/getUserChats").get(getUserChats);
router.route("/getUserHobby/:username").get(getUserHobby);

module.exports = router;
