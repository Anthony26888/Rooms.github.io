import express from "express";
import http from "http";
import { Server } from "socket.io";
import PocketBase from "pocketbase";
import cors from "cors";
import { EventSource } from "eventsource";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Polyfill EventSource for Node.js
global.EventSource = EventSource;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const pb = new PocketBase(process.env.VITE_APP_POCKETBASE_URL); // Get URL from environment variable

// Đăng nhập với tài khoản admin
async function loginAdmin() {
  try {
    await pb.admins.authWithPassword("haidang34821@gmail.com", "haidang007");
    console.log("✅ Đăng nhập admin thành công");
  } catch (error) {
    console.error("❌ Lỗi đăng nhập admin:", error);
  }
}

// Gọi hàm đăng nhập
loginAdmin();

pb.collection("Rooms").subscribe("*", function (e) {
  io.emit("getRooms", e.record);
});
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("getRooms", async () => {
    try {
      const records = await pb.collection("Rooms").getFullList({
        sort: "-created",
      });
      socket.emit("RoomsData", records);
    } catch (error) {
      socket.emit("RoomsError", error);
    }
  });
  socket.on("getServices", async () => {
    try {
      const records = await pb.collection("Services").getFullList({
        sort: "-created",
      });
      socket.emit("ServicesData", records);
    } catch (error) {
      socket.emit("ServicesError", error);
    }
  });
  socket.on("getHistory", async (id) => {
    try {
      const records = await pb.collection("History").getFullList({
        sort: "-updated",
        filter: `Room_Id = "${id}"`,
      });
      socket.emit("HistoryData", records);
    } catch (error) {
      socket.emit("HistoryError", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Rooms
app.post("/api/rooms", async (req, res) => {
  const room = await pb.collection("Rooms").create(req.body);
  io.emit("RoomsUpdate", room);
  res.json(room);
});

app.delete("/api/rooms/:id", async (req, res) => {
  await pb.collection("Rooms").delete(req.params.id);
  io.emit("RoomsUpdate");
  res.json({ message: "Room deleted" });
});

app.put("/api/rooms/:id", async (req, res) => {
  const room = await pb.collection("Rooms").update(req.params.id, req.body);
  io.emit("RoomsUpdate", room);
  res.json(room);
});

app.put("/api/rooms/electric/:id", async (req, res) => {
  const room = await pb.collection("Rooms").update(req.params.id, req.body);
  io.emit("RoomsUpdate", room);
  res.json(room);
});

// Services
app.put("/api/services/:id", async (req, res) => {
  const service = await pb
    .collection("Services")
    .update(req.params.id, req.body);
  io.emit("ServicesUpdate", service);
  res.json(service);
});

// History
app.post("/api/collections/History/records/:id", async (req, res) => {
  const history = await pb
    .collection("History")
    .create(req.params.id, req.body);
  io.emit("HistoryUpdate", history);
  res.json(history);
});

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle frontend routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("Not Found");
});

server.listen(3000, () => {
  console.log("✅ Backend running");
});
