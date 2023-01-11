const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  username: String,
  roomMessages: [{ pair: String, messages: [] }],
});
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

const userPairsSchema = new mongoose.Schema({
  username: String,
  pairs: [],
});
const userPairs = mongoose.model("UserPairs", userPairsSchema);

module.exports = { ChatRoom, userPairs };
