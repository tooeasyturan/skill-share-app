/** @format */

import app from "./app";

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket", "polling"],
});

const users: { [key: string]: string } = {};

io.on("connection", (socket: any) => {
  socket.on("new-user", (name: any) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send", (comment: any) => {
    socket.broadcast.emit("comment", {
      comment: comment,
      name: users[socket.id],
    });
  });
});

http.listen(8000, () => {
  console.log(`Server running on port 8000`);
});
