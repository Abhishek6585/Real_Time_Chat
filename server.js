
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-connected", username);
  });

  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      socket.broadcast.emit("user-disconnected", users[socket.id]);
      delete users[socket.id];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
