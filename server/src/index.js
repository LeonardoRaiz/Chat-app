const express = require("express");
const cors = require("cors");
require("reflect-metadata");
const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/messagesRoute");

const app = express();
const socket = require("socket.io");
app.use(express.json());
require("dotenv").config();
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/messages", msgRoutes);

const { client } = require("./database/database");

const PORT = process.env.PORT || 3000;

client
  .connect()
  .then(() => {
    console.log("DB conectado");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(PORT, () => {
  console.log(`Servidor está ativo! na porta ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credetials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data.to);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});