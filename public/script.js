
const socket = io();
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const username = prompt("Enter your name:");
appendMessage("You joined");
socket.emit("new-user", username);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} joined the chat`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} left the chat`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, true);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message, self = false) {
  const msgElement = document.createElement("div");
  msgElement.innerText = message;
  msgElement.classList.add("message");
  if (self) msgElement.classList.add("self");
  messageContainer.append(msgElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
