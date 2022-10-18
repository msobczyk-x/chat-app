const socket = io();
const username = prompt("what's your nickname?");
const messages = document.querySelector("#messages");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const roomInput = document.querySelector("#room");
const joinRoom = document.querySelector(".joinRoom");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  if (message === "") return;
  createMessage(username, message);
  socket.emit("chat message", message);
  input.value = "";
});
joinRoom.addEventListener("click", (e) => {
  e.preventDefault();
  const room = roomInput.value;
  if (room === "") return;

  socket.emit("join room", room, (message) => {
    roomInput.value = "";
    socket.emit("chat message", "joined room");

    createMessage(username, message);
  });
});
socket.on("connect", () => {
  createMessage(username, `You connected with id ${socket.id}`);
  socket.emit("register username", username);
});

socket.on("chat message", (username, message) => {
  createMessage(username, message);
});

function createMessage(username, message) {
  let item = document.createElement("li");
  item.textContent = `${username}: ${message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
