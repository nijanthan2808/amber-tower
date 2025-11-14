import React, { useState } from 'react';
import { createBooking } from '../api.js';


export default function BookingForm() {
const [form, setForm] = useState({
name: '', email: '', phone: '', event_date: '', event_type: 'Private', location: '', package: 'Dry Hire Only', notes: ''
});
const [status, setStatus] = useState({ sending: false, ok: null, msg: '' });


function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }


async function onSubmit(e) {
e.preventDefault();
setStatus({ sending: true, ok: null, msg: '' });
try {
await createBooking(form);
setStatus({ sending: false, ok: true, msg: 'Thanks! Your request has been submitted.' });
setForm({ name: '', email: '', phone: '', event_date: '', event_type: 'Private', location: '', package: 'Dry Hire Only', notes: '' });
} catch (e) {
setStatus({ sending: false, ok: false, msg: e.message || 'Something went wrong' });
}
}


return (
<section className="section">
<h2 className="text-2xl font-bold mb-4">Request a Booking</h2>
<form onSubmit={onSubmit} className="card grid gap-4">
<div className="grid md:grid-cols-2 gap-4">
<label className="grid gap-1 text-sm">Name
<input required className="border rounded-xl p-3" value={form.name} onChange={(e)=>update('name', e.target.value)} />
</label>
<label className="grid gap-1 text-sm">Email
<input type="email" required className="border rounded-xl p-3" value={form.email} onChange={(e)=>update('email', e.target.value)} />
</label>
<label className="grid gap-1 text-sm">Phone
<input className="border rounded-xl p-3" value={form.phone} onChange={(e)=>update('phone', e.target.value)} />
</label>
<label className="grid gap-1 text-sm">Event Date
<input type="date" required className="border rounded-xl p-3" value={form.event_date} onChange={(e)=>update('event_date', e.target.value)} />
</label>
<label className="grid gap-1 text-sm">Event Type
<select className="border rounded-xl p-3" value={form.event_type} onChange={(e)=>update('event_type', e.target.value)}>
<option>Wedding</option>
<option>Corporate</option>
<option>Private</option>
<option>Festival</option>
<option>Other</option>
</select>
</label>
<label className="grid gap-1 text-sm">Location
<input className="border rounded-xl p-3" value={form.location} onChange={(e)=>update('location', e.target.value)} />
</label>
<label className="grid gap-1 text-sm">Package
<select className="border rounded-xl p-3" value={form.package} onChange={(e)=>update('package', e.target.value)}>
<option>Dry Hire Only</option>
<option>Dry Hire + Staff</option>
<option>Wedding Setup</option>
</select>
</label>
<label className="grid gap-1 text-sm md:col-span-2">Notes
<textarea className="border rounded-xl p-3 min-h-[120px]" value={form.notes} onChange={(e)=>update('notes', e.target.value)} />
</label>
</div>
<button disabled={status.sending} className="btn btn-primary w-fit">{status.sending ? 'Sending…' : 'Submit Request'}</button>
{status.msg && (
<p className={"text-sm " + (status.ok ? 'text-green-600' : 'text-red-600')}>{status.msg}</p>
)}
</form>
</section>
);
}