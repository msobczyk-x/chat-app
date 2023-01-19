const { ChatRoom, userPairs, userStatus } = require("../models/chatModel");

const saveMessagesToDB = (username, messages, room, pair) => {
  if (pair && username !== pair) {
    if (messages) {
      ChatRoom.findOne({ username: username }, (err, chat) => {
        if (!chat) {
          ChatRoom.create({
            username: username,
            roomMessages: [{ pair: pair, messages: messages }],
          });
        } else {
          let alreadyExists = false;
          chat.roomMessages.forEach((el) => {
            if (el.pair === pair) {
              alreadyExists = true;
            }
          });
          if (alreadyExists) {
            chat.roomMessages.forEach((el) => {
              if (el.pair === pair) el.messages.push(...messages);
            });
          } else {
            chat.roomMessages.push({ pair: pair, messages: messages });
          }
          chat.save((err, updated) => {
            if (err) console.log(err);
          });
        }
      });
    }
  }
};
const saveUserPairsToDB = (username, newPairs) => {
  if (!newPairs) return;
  userPairs.findOne({ username: username }, (err, pairs) => {
    if (!pairs) {
      userPairs.create({
        username: username,
        pairs: newPairs,
      });
    } else {
      let oldPairs = pairs.pairs;
      let allPairs = oldPairs.concat(newPairs);
      let uniquePairs = new Set(allPairs);
      pairs.pairs = Array.from(uniquePairs);
      pairs.save((err, updated) => {
        if (err) console.log(err);
      });
    }
  });
};
const getUserPairs = async (username) => {
  const data = await userPairs.find({ username: username });
  return data[0] ? data[0].pairs : [];
};
const saveUserStatus = async (username, status) => {
  userStatus.findOne({ username: username }, (err, data) => {
    if (!data) {
      userStatus.create({
        username: username,
        status: status,
      });
    } else {
      data.status = status;
      data.save((err, updated) => {
        if (err) console.log(err);
      });
    }
  });
};
const getUserStatus = async (usernames) => {
  let res = [];
  for (const user of usernames) {
    const data = await userStatus.findOne({ username: user });
    if (data) {
      res.push({ [user]: data.status });
    }
  }
  return res;
};

module.exports = {
  saveMessagesToDB,
  saveUserPairsToDB,
  getUserPairs,
  getUserStatus,
  saveUserStatus,
};
