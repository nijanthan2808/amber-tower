import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import { initDB, createBooking, listBookings, updateBookingStatus, getBookingById } from './db.js';
import { makeTransportFromEnv, sendDecisionEmail, sendNewBookingEmail, sendContactEmail } from './nodemailer.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5174;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const FROM_EMAIL = process.env.FROM_EMAIL || 'theambertower@gmail.com';
const DEST_EMAIL = process.env.DEST_EMAIL || 'theambertower@gmail.com';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../client-dist");



const transporter = makeTransportFromEnv(process.env);

app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));


initDB();

// Public health check
app.get('/api/health', (_, res) => res.json({ ok: true }));


// Public: create booking
app.post('/api/bookings', async (req, res) => {
try {
const required = ['name', 'email', 'event_date'];
for (const field of required) {
if (!req.body[field]) return res.status(400).json({ error: `${field} is required` });
}
const result = await createBooking(req.body);


// Send owner notification email (non-blocking)
try {
const booking = await getBookingById(result.id);
await sendNewBookingEmail(transporter, FROM_EMAIL, DEST_EMAIL, booking);
} catch (e) {
console.warn('Email send failed (new booking):', e?.message);
}


res.status(201).json({ id: result.id, message: 'Booking submitted' });
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Failed to create booking' });
}
});


// Auth: login -> JWT
app.post('/api/auth/login', (req, res) => {
const { password } = req.body || {};
if (!password || password !== ADMIN_PASSWORD) {
return res.status(401).json({ error: 'Invalid credentials' });
}
const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
res.json({ token });
});

// Middleware: require admin
function requireAdmin(req, res, next) {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
if (!token) return res.status(401).json({ error: 'Missing token' });
try {
const payload = jwt.verify(token, JWT_SECRET);
if (payload.role !== 'admin') throw new Error('bad role');
next();
} catch (e) {
return res.status(401).json({ error: 'Invalid token' });
}
}


// Admin: list bookings
app.get('/api/bookings', requireAdmin, async (_req, res) => {
try {
const rows = await listBookings();
res.json(rows);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Failed to load bookings' });
}
});


// Admin: update booking status/comment
app.patch('/api/bookings/:id', requireAdmin, async (req, res) => {
try {
const { status, admin_comment } = req.body || {};
if (!['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
return res.status(400).json({ error: 'Invalid status' });
}
const id = Number(req.params.id);
await updateBookingStatus(id, status, admin_comment);
const updated = await getBookingById(id);
// optional email
try {
await sendDecisionEmail(transporter, FROM_EMAIL, updated, status);
} catch (_) {}
res.json(updated);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Failed to update booking' });
}
});

// Public: contact form -> send email to DEST_EMAIL
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });
    if (!transporter) return res.status(500).json({ error: 'Email is not configured on the server' });
    await sendContactEmail(transporter, FROM_EMAIL, DEST_EMAIL, { name, email, message });
    res.json({ ok: true, message: 'Message sent' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to send message' });
  }
});


app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});


app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));

