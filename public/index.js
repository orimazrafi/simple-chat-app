const socket = io.connect("http://localhost:4000");

let message = document.getElementById("message");
let name = document.getElementById("name");
let btn = document.getElementById("submit");
let messages = document.getElementById("messages");
let feedback = document.getElementById("feedback");

btn.addEventListener("click", () => {
  socket.emit("chat", { name: name.value, message: message.value });
});
socket.on("chat", ({ name, message }) => {
  feedback.innerHTML = "";
  messages.innerHTML += `<p>name: <strong>${name}</strong> message: 
  <strong>${message}</strong></p>`;
});
message.addEventListener("keypress", () => {
  socket.emit("typing", name.value);
});

socket.on("typing", name => {
  feedback.innerHTML = `${name} is typing...`;
});
