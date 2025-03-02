import express from "express";
import cors from "cors";
import { createServer } from "http";
import { setupWebSocket } from "./socket";
import { connectDb } from "./database";
import { app_port } from "./config";

// api endpoints

import ConversationRoutes from "./routes/conversation.routes";
import MessageRoutes from "./routes/message.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(`/api/v1`, ConversationRoutes, MessageRoutes);

const server = createServer(app);

// Connect WebSocket
setupWebSocket(server);

// MongoDB Connection
connectDb(() => {
  server.listen(app_port, () =>
    console.log(`Server running on port: ${app_port} `)
  );
});
