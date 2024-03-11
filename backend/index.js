import { Server } from "socket.io";

const io = new Server({
  cors: true,
});

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("new-user", ({ userName, prompt }) => {
    console.log("New user joined", userName, prompt);
    socket.join(prompt);
    io.to(prompt).emit("user-joins-chat");
  });

  socket.on("new-msg", ({ message, prompt }) => {
    console.log("New msg recieved=", message, " from=", from);
    socket.to(prompt).emit("new-msg", { message, prompt });
  });

  /**
   * Disconnection
   */
  socket.on("disconnecting", () => {
    console.log("disconnecting"); // the Set contains at least the socket ID
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  socket.conn.on("close", (reason) => {
    console.log("User disconnected!", reason);
    // Upon disconnection, sockets leave all the channels they were part of automatically,
    // and no special teardown is needed on our part.
  });
});

io.listen(8001);
