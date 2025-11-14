import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname and dbPath FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data.db');

// ✅ Then create and export db AFTER dbPath is defined
export const db = new sqlite3.Database(dbPath);

export function initDB() {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    event_date TEXT,
    event_type TEXT,
    location TEXT,
    package TEXT,
    notes TEXT,
    status TEXT DEFAULT 'PENDING',
    admin_comment TEXT
  )`);
}

export function createBooking(data) {
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO bookings (name, email, phone, event_date, event_type, location, package, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(
      q,
      [data.name, data.email, data.phone, data.event_date, data.event_type, data.location, data.package, data.notes],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
}

// (rest of functions below)




export function listBookings() {
return new Promise((resolve, reject) => {
db.all(`SELECT * FROM bookings ORDER BY created_at DESC`, [], (err, rows) => {
if (err) return reject(err);
resolve(rows);
});
});
}


export function updateBookingStatus(id, status, admin_comment) {
return new Promise((resolve, reject) => {
db.run(`UPDATE bookings SET status = ?, admin_comment = ? WHERE id = ?`, [status, admin_comment || '', id], function (err) {
if (err) return reject(err);
resolve({ changes: this.changes });
});
});
}


export function getBookingById(id) {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM bookings WHERE id = ?`, [id], (err, row) => {
if (err) return reject(err);
resolve(row);
});
});
}