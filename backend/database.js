import sqlite3 from "sqlite3";
// Dùng biến môi trường hoặc fallback mặc định
const DB_PATH = process.env.DB_PATH || "./data/database.db";


const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Lỗi khi kết nối cơ sở dữ liệu:", err.message);
  } else {
    console.log(`Đã kết nối đến cơ sở dữ liệu SQLite tại ${DB_PATH}`);
    db.run("PRAGMA foreign_keys = ON;", (pragmaErr) => {
      if (pragmaErr) {
        console.error("Lỗi khi bật hỗ trợ khóa ngoại:", pragmaErr.message);
      } else {
        console.log("Hỗ trợ khóa ngoại đã được bật.");
      }
    });
  }
});

// Create table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS History (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Location TEXT NOT NULL,
        created TEXT NOT NULL,
        Room_Charge NUMERIC NOT NULL,
        Electric_Charge NUMERIC NOT NULL,
        Water NUMERIC NOT NULL,
        Trash NUMERIC NOT NULL,
        Wifi NUMERIC NOT NULL,
        Cable NUMERIC NOT NULL,
        Total NUMERIC NOT NULL,
        Room_Id TEXT NOT NULL,
        Electric_KW NUMERIC NOT NULL,
        Electric_Old NUMERIC NOT NULL,
        Electric_New NUMERIC NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS Rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Deposit NUMERIC NOT NULL,
        Electric NUMERIC NOT NULL,
        Location TEXT NOT NULL,
        Members TEXT NOT NULL,
        Name TEXT NOT NULL,
        Room_Charge NUMERIC NOT NULL,
        Wifi BOOLEAN NOT NULL,
        Cable BOOLEAN NOT NULL,
        Status TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS Services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Cable	NUMERIC NOT NULL,
        Electric_100	NUMERIC NOT NULL,
        Electric_200	NUMERIC NOT NULL,
        Electric_300	NUMERIC NOT NULL,
        Electric_400	NUMERIC NOT NULL,
        Electric_50	NUMERIC NOT NULL,
        Trash	NUMERIC NOT NULL,
        Water	NUMERIC NOT NULL,
        Wifi	NUMERIC NOT NULL
    )`);
});

export default db;