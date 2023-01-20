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
      if (data.status === "online") res.push({ [user]: data.status });
      else res.push({ [user]: calculateTime(data.status) });
    }
  }
  return res;
};

const calculateTime = (prevTime) => {
  const timeNow = `${
    new Date().toISOString().split("T")[0]
  } ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  let date1 = new Date(Date.parse(prevTime));
  let date2 = new Date(Date.parse(timeNow));

  let timeDiff = date2.getTime() - date1.getTime();
  let seconds = Math.floor(timeDiff / 1000);
  let minutes = Math.floor(timeDiff / (1000 * 60));
  let hours = Math.floor(timeDiff / (1000 * 60 * 60));
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let res = timeDiff;
  if (days > 0) res = `${days} days ago`;
  else if (hours > 0) res = `${hours} hours ago`;
  else if (minutes > 0) res = `${minutes} min ago`;
  else if (seconds > 0) res = `${seconds} sec ago`;
  return res;
};

module.exports = {
  saveMessagesToDB,
  saveUserPairsToDB,
  getUserPairs,
  getUserStatus,
  saveUserStatus,
};
