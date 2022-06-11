const socketIO = require("socket.io");

module.exports = (server) => {
  //   io setup
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  // first of setup sockets to create a socket for the app/server
  //  recall, io works for the app, while sockets works for the user(s). It is a single user connection to the app.

  io.on("connection", (socket) => {
    // returns a socket for the user.
    console.log("socket io connected");

    // we want to create a room for the user, something specific to each user (good for notifications, e.t.c)
    socket.on("setup", (userData) => {
      console.log("user data", userData);
      socket.join(userData.user._id.toString());
      socket.emit("user online");
    });

    // to jon a chat room
    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("typing", (chatID) => {
      socket.broadcast.to(chatID).emit("isTyping");
    });

    socket.on("stop typing", (chatID) => {
      socket.broadcast.to(chatID).emit("stop isTyping");
    });

    // when a new message comes in
    socket.on("new message", (newMessage) => {
      // broadcast the message to the whole chat
      socket.in(newMessage.chat).emit("message", newMessage);
    });
  });

  return io;
};
