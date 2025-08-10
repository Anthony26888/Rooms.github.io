import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { EventSource } from "eventsource";
import dotenv from "dotenv";
import db from "./database.js";

// Load environment variables
dotenv.config();

// Polyfill EventSource for Node.js
global.EventSource = EventSource;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("getRooms", async () => {
    try {
      const query = `SELECT * FROM Rooms ORDER BY id ASC`;
      db.all(query, [], (err, rows) => {
        if (err) return socket.emit("RoomsError", err);
        socket.emit("RoomsData", rows);
      });
    } catch (error) {
      socket.emit("detailBomError", error);
    }
  });
  socket.on("getServices", async () => {
    try {
      const query = `SELECT * FROM Services ORDER BY id ASC`;
      db.all(query, [], (err, rows) => {
        if (err) return socket.emit("ServicesError", err);
        socket.emit("ServicesData", rows);
      });
    } catch (error) {
      socket.emit("ServicesError", error);
    }
  });
  socket.on("getHistory", async (id) => {
    const query = `SELECT * FROM History ORDER BY id DESC`;
    db.all(query, [], (err, rows) => {
      if (err) return socket.emit("HistoryError", err);
      socket.emit("HistoryData", rows);
    });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Rooms
app.post("/api/rooms", async (req, res) => {
  const room = req.body;
  try {
    const query = `INSERT INTO Rooms (Name, Location, Room_Charge, Deposit, Electric, Members, Wifi, Cable, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [room.Name, room.Location, room.Room_Charge, room.Deposit, room.Electric, room.Members, room.Wifi, room.Cable, room.Status], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit("RoomsUpdate", room);
      res.json(room);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/rooms/:id", async (req, res) => {
  try {
    const query = `DELETE FROM Rooms WHERE id = ?`;
    db.run(query, [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit("RoomsUpdate");
      res.json({ message: "Room deleted" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/rooms/:id", async (req, res) => {
  const room = req.body;
  try {
    const query = `UPDATE Rooms SET Name = ?, Location = ?, Deposit = ?, Electric = ?, Members = ?, Room_Charge = ?, Wifi = ?, Cable = ?, Status = ? WHERE id = ?`;
    db.run(query, [room.Name, room.Location, room.Deposit, room.Electric, room.Members, room.Room_Charge, room.Wifi, room.Cable, room.Status, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit("RoomsUpdate", room);
      res.json(room);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/rooms/electric/:id", async (req, res) => {
  const { Electric } = req.body;
  try {
    const query = `UPDATE Rooms SET Electric = ? WHERE id = ?`;
    db.run(query, [Electric, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit("RoomsUpdate", Electric);
      res.json(Electric);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Services
app.put("/api/services/:id", async (req, res) => {
  const { Cable, Electric, Trash, Water, Wifi } = req.body;
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  // Chuyển string sang number (nếu có)
  const cableNum = Number(Cable);
  const electricNum = Number(Electric);
  const trashNum = Number(Trash);
  const waterNum = Number(Water);
  const wifiNum = Number(Wifi);

  if ([cableNum, electricNum, trashNum, waterNum, wifiNum].some(isNaN)) {
    return res.status(400).json({ error: "Invalid numeric values in services data" });
  }

  const query = `
    UPDATE Services 
    SET Cable = ?, Electric = ?, Trash = ?, Water = ?, Wifi = ? 
    WHERE id = ?`;

  db.run(query, [cableNum, electricNum, trashNum, waterNum, wifiNum, id], (err) => {
    if (err) {
      console.error("SQL update error:", err);
      return res.status(500).json({ error: err.message });
    }
    io.emit("ServicesUpdate", req.body);
    res.json(req.body);
  });
});


// History
app.post("/api/history", async (req, res) => {
  const history = req.body;
  try {
    const query = `INSERT INTO History (Name, Location, Room_Charge, Electric_Charge, Water, Trash, Wifi, Cable, Total, Room_Id, Electric_KW, Electric_Old, Electric_New, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
    db.run(query, [history.Name, history.Location, history.Room_Charge, history.Electric_Charge, history.Water, history.Trash, history.Wifi, history.Cable, history.Total, history.Room_Id, history.Electric_KW, history.Electric_Old, history.Electric_New, history.created], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit("HistoryUpdate", history);
      res.json(history);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Handle 404
app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
  }
});