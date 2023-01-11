const { ChatRoom, userPairs } = require("../models/chatModel");

const saveMessagesToDB = (username, messages, room, pair) => {
  if (messages) {
    ChatRoom.findOne({ username: username }, (err, chat) => {
      if (!chat) {
        ChatRoom.create({
          username: username,
          roomMessages: [{ pair: pair, messages: messages }],
        });
      } else {
        chat.roomMessages.push({ pair: pair, messages: messages });
        chat.save((err, updated) => {
          if (err) console.log(err);
        });
      }
    });
  }
};
const saveUserPairsToDB = (username, newPairs) => {
  if (newPairs[username] == null) return;
  userPairs.findOne({ username: username }, (err, pairs) => {
    if (!pairs) {
      userPairs.create({
        username: username,
        pairs: newPairs[username],
      });
    } else {
      let oldPairs = pairs.pairs;
      let allPairs = oldPairs.concat(newPairs[username]);
      let uniquePairs = new Set(allPairs);
      pairs.pairs = Array.from(uniquePairs);
      pairs.save((err, updated) => {
        if (err) console.log(err);
      });
    }
  });
};

module.exports = { saveMessagesToDB, saveUserPairsToDB };
