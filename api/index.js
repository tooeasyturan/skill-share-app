/** @format */

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket", "polling"],
});

// const io = require("socket.io")(8000);

app.get("/test", (req, res) => {
  res.send("<h1>Hello Backend!</h1>");
});

// const users = [];
// io.on("connection", (socket) => {
//   socket.emit("username", (username) => {
//     console.log("TEST", username);
//     const user = {
//       name: username,
//     };
//     users.push(user);
//     console.log("USERS", users);
//     io.emit("user", user.name);
//     io.emit("users", Object.values(users));
//   });

//   socket.on("send", (comment) => {
//     console.log("send comment", comment);
//     socket.emit("comment", {
//       user: users[0],
//       text: comment,
//       date: new Date().toISOString(),
//     });
//   });
// });

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send", (comment) => {
    socket.broadcast.emit("comment", {
      comment: comment,
      name: users[socket.id],
    });
  });
});

http.listen(8000, () => {
  console.log(`Server running on port 8000`);
});
