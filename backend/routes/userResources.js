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
router.route("/updateUser/:username").put(updateUser);
router.route("/getUserChats/:username/:pair").get(getUserChats);
router.route("/getUserPairs/:username").get(getUserPairs);
router.route("/getUser/:username").get(getUser);
router.route("/getUserHobby/:username").get(getUserHobby);

module.exports = router;
