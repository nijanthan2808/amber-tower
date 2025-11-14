import React, { useEffect, useState } from 'react';
import { adminLogin, adminList, adminUpdate } from '../api.js';


export default function Admin() {
const [token, setToken] = useState('');
const [password, setPassword] = useState('');
const [rows, setRows] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


async function login() {
try {
const { token } = await adminLogin(password);
setToken(token);
setPassword('');
setError('');
} catch (e) {
setError(e.message);
}
}

async function load() {
setLoading(true);
try {
const data = await adminList(token);
setRows(data);
} catch (e) {
setError(e.message);
} finally { setLoading(false); }
}


useEffect(() => { if (token) load(); }, [token]);


async function setStatus(id, status) {
const comment = prompt(`Add a ${status.toLowerCase()} comment (optional):`) || '';
await adminUpdate(id, token, { status, admin_comment: comment });
await load();
}

if (!token) {
return (
<section className="section max-w-lg">
<div className="card">
<h2 className="text-xl font-bold mb-2">Admin Login</h2>
<p className="text-sm text-neutral-600 mb-4">Enter the admin password to manage booking requests.</p>
<input type="password" className="border rounded-xl p-3 w-full" placeholder="Admin password" value={password} onChange={(e)=>setPassword(e.target.value)} />
<button className="btn btn-primary mt-4" onClick={login}>Login</button>
{error && <p className="text-sm text-red-600 mt-2">{error}</p>}
</div>
</section>
);
}



return (
<section className="section">
<h2 className="text-2xl font-bold mb-4">Bookings</h2>
<div className="grid gap-3">
{loading && <p>Loading…</p>}
{!loading && rows.length === 0 && <p>No bookings yet.</p>}
{rows.map((b) => (
<div key={b.id} className="card">
<div className="flex flex-wrap items-center justify-between gap-2">
<div>
<p className="font-semibold">{b.name} • {b.email}</p>
<p className="text-sm text-neutral-600">{b.event_type} — {b.event_date} • {b.location}</p>
<p className="text-sm">Package: {b.package}</p>
{b.notes && <p className="text-sm text-neutral-700 mt-1">Notes: {b.notes}</p>}
{b.admin_comment && <p className="text-sm mt-1"><span className="font-medium">Comment:</span> {b.admin_comment}</p>}
</div>
<div className="flex items-center gap-2">
<span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : b.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>{b.status}</span>
<button className="btn" onClick={()=>setStatus(b.id, 'PENDING')}>Mark Pending</button>
<button className="btn" onClick={()=>setStatus(b.id, 'ACCEPTED')}>Accept</button>
<button className="btn" onClick={()=>setStatus(b.id, 'REJECTED')}>Reject</button>
</div>
</div>
</div>
))}
</div>
</section>
);
}