const Chat = require("../models/chatModel");

const saveMessagesToDB = (username, messages, room) => {
  if (messages) {
    Chat.findOne({ username: username }, (err, chat) => {
      if (!chat) {
        Chat.create({
          username: username,
          roomMessages: [{ roomId: room, messages: messages }],
        });
      } else {
        chat.roomMessages.push({ roomId: room, messages: messages });
        chat.save((err, updated) => {
          if (err) console.log(err);
        });
      }
    });
  }
};

module.exports = saveMessagesToDB;
