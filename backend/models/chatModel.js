const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  username: String,
  roomMessages: [{ roomId: String, messages: [] }],
});
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
