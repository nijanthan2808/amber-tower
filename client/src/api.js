const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5174/api';


export async function createBooking(payload) {
const res = await fetch(`${API_BASE}/bookings`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!res.ok) throw new Error((await res.json()).error || 'Failed');
return res.json();
}


export async function adminLogin(password) {
const res = await fetch(`${API_BASE}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ password }),
});
if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
return res.json();
}


export async function adminList(token) {
const res = await fetch(`${API_BASE}/bookings`, { headers: { Authorization: `Bearer ${token}` } });
if (!res.ok) throw new Error((await res.json()).error || 'Load failed');
return res.json();
}


export async function adminUpdate(id, token, payload) {
const res = await fetch(`${API_BASE}/bookings/${id}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
body: JSON.stringify(payload),
});
if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
return res.json();
}

export async function sendContact(payload) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send message');
  return data;
}