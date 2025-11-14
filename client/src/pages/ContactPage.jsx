import React, { useState } from 'react';
import { sendContact } from '../api.js';

const ADDRESS_LINES = [
  'The Amber Tower',
  '89 Sweet Briar Lawn',
  'Tramore, Co. Waterford, Ireland',
];
const MAP_Q = encodeURIComponent('89 Sweet Briar Lawn, Tramore, Co. Waterford, Ireland');
const GOOGLE_MAPS_LINK = `https://www.google.com/maps?q=${MAP_Q}`;
const STATIC_MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';
const STATIC_MAP_URL = STATIC_MAP_KEY
  ? `https://maps.googleapis.com/maps/api/staticmap?center=${MAP_Q}&zoom=15&size=800x300&maptype=roadmap&markers=color:orange|${MAP_Q}&key=${STATIC_MAP_KEY}`
  : '';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: '' });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: '' });
    try {
      await sendContact(form);
      setStatus({ sending: false, ok: true, msg: 'Thanks! Your message has been sent.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (e) {
      setStatus({ sending: false, ok: false, msg: e.message || 'Something went wrong' });
    }
  }

  return (
    <section className="section">
      <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
      <p className="text-neutral-400 mb-6">We’d love to hear about your event. Reach out to us with any of the following ways. We are happy to assist you.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Address</h3>
          <div className="addressdetails">
            {ADDRESS_LINES.map(l => <p key={l}>{l}</p>)}
            <p className="mt-2">Email: <a className="underline" href="mailto:nj@theambertower.com">nj@theambertower.com</a></p>
            <p>Phone: 085 730 1544</p>
          </div>
          <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noreferrer" className="block">
            {STATIC_MAP_URL ? (
              <img src={STATIC_MAP_URL} alt="Map preview" className="w-full rounded-xl border border-[rgba(255,255,255,0.08)]" />
            ) : (
              <div className="aspect-[16/6] w-full grid place-items-center rounded-xl border border-[rgba(255,255,255,0.08)] text-neutral-400 hover:text-[color:var(--amber)]">
                Open in Google Maps
              </div>
            )}
          </a>
        </div>

        <form onSubmit={onSubmit} className="card_1">
          <h2 className="text-lg font-semibold mb-3">Contact Form</h2>
          <label><span>Name</span><input required value={form.name} onChange={e=>update('name', e.target.value)} /></label>
          <label><span>Email</span><input required type="email" value={form.email} onChange={e=>update('email', e.target.value)} /></label>
          <label><span>Phone</span><input required type="phone" value={form.phone} onChange={e=>update('phone', e.target.value)} /></label>
          <label><span>Message</span><textarea required placeholder="Tell us about your event" value={form.message} onChange={e=>update('message', e.target.value)} /></label>
          <button disabled={status.sending} className="btn btn-primary">{status.sending ? 'Sending…' : 'Send Message'}</button>
          {status.msg && <p className={`text-sm mt-2 ${status.ok ? 'text-green-500' : 'text-red-500'}`}>{status.msg}</p>}
        </form>
      </div>
    </section>
  );
}
