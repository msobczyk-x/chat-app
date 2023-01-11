const express = require("express");
const {
  getUserHobby,
  saveHobby,
  getUserChats,
  updateUser,
  getUser,
  getUserPairs,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/saveHobby").post(saveHobby);
router.route("/updateUser/:username").patch(updateUser);
router.route("/getUserChats").get(getUserChats);
router.route("/getUserPairs").get(getUserPairs);
router.route("/getUser/:username").get(getUser);
router.route("/getUserHobby/:username").get(getUserHobby);

module.exports = router;
