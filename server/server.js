import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/usesRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app); //http server is used bcoz it support socket.io

// Client connects with userId.
// Server saves: { userId: socket.id }.
// Server broadcasts: all current online userIds.
// Client disconnects → remove from map.
// Broadcast updated list again.

//initialize the socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//store online users
export const userSocketMap = {}; //{userId:socketId}

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  //emit online user to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
// middleware
app.use(express.json({ limit: "4mb" })); //4mb data can be stored
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("server is running good!");
});

//routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

if (process.env.NODE_ENV != "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("server si running on port" + PORT));
}

//Export server for vercel
export default server;
