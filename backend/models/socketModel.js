const mongoose = require("mongoose");

const socketSchema = new mongoose.Schema({
  id: String,
  socket: Object,
});
const Socket = mongoose.model("Socket", socketSchema);

module.exports = Socket;