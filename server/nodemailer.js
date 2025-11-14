import nodemailer from 'nodemailer';



export function makeTransportFromEnv(env = process.env) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false, // true only if port 465
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}


export async function sendDecisionEmail(transport, fromEmail, booking, status) {
if (!transport) return;
const subject = `Your Amber Tower booking was ${status.toLowerCase()}`;
const text = `Hi ${booking.name},\n\nYour booking request for ${booking.event_date} has been ${status.toLowerCase()}.\n\nComment: ${booking.admin_comment || '—'}\n\nThank you,\nThe Amber Tower`;
await transport.sendMail({ from: fromEmail, to: booking.email, subject, text });
}

export async function sendContactEmail(transport, fromEmail, toEmail, payload) {
  if (!transport) return;
  const { name, email, message } = payload;
  const subject = `Message from ${name} via The Amber Tower Website`;
  const text = `New contact message received.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
  await transport.sendMail({
    from: fromEmail,
    to: toEmail || fromEmail,
    subject,
    text,
    replyTo: email,
  });
  console.log(`📧 Contact email sent to ${toEmail}`);
}


export async function sendNewBookingEmail(transport, fromEmail, toEmail, booking) {
if (!transport) return;
const subject = `New Booking Request: ${booking.event_date} — ${booking.name} (${booking.event_type || 'Event'})`;
const lines = [
`Name: ${booking.name}`,
`Email: ${booking.email}`,
`Phone: ${booking.phone || '—'}`,
`Event Date: ${booking.event_date}`,
`Event Type: ${booking.event_type || '—'}`,
`Location: ${booking.location || '—'}`,
`Package: ${booking.package || '—'}`,
'',
'Notes:',
booking.notes || '—',
];
const text = lines.join('');
await transport.sendMail({ from: fromEmail, to: toEmail || fromEmail, subject, text, replyTo: booking.email });
}