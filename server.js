const express = require("express");
const socket = require("socket.io");
const app = express();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`listining on port ${port}`);
});
app.use(express.static("public"));

const io = socket(server);
io.on("connection", socket => {
  console.log(`${socket.id} is connected!`);
  socket.on("chat", data => {
    console.log(data);
    io.sockets.emit("chat", data);
  });
  socket.on("typing", name => {
    socket.broadcast.emit("typing", name);
  });
});
