import { Server } from "socket.io";
import { Message } from "../database/models";

export const setupWebSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a conversation
    socket.on("joinRoom", (conversationId, senderId) => {
      socket.join(conversationId);
      console.log(`User joined room: ${conversationId}`);
    });

    // Send a message
    socket.on("sendMessage", async ({ conversationId, senderId, content }) => {
      const newMessage = await new Message({
        sender: senderId,
        conversation: conversationId,
        content,
      }).save();

      // Emit message to all users in the room
      io.to(conversationId).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
