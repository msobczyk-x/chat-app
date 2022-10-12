const socket = io();
const username = prompt("what's your nickname?");
const messages = document.querySelector("#messages");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const roomInput = document.querySelector("#room");
const joinRoom = document.querySelector(".joinRoom");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = input.value;
  const room = roomInput.value;
  if (msg === "") return;
  createMessage(username, msg);
  socket.emit("chat message", msg, room);
  input.value = "";
});
joinRoom.addEventListener("click", (e) => {
  e.preventDefault();

  const room = roomInput.value;
  socket.emit("join room", room, (message) => {
    createMessage(username, message);
  });
});
socket.on("connect", () => {
  createMessage(username, `You connected with id ${socket.id}`);
  socket.emit("register username", username);
});

socket.on("chat message", (msg, username) => {
  createMessage(username, msg);
});

function createMessage(username, message) {
  let item = document.createElement("li");
  item.textContent = `${username}: ${message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
