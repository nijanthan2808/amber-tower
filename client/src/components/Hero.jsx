import React from 'react';
import { Link } from 'react-router-dom';


export default function Hero() {
return (
<section className="section grid md:grid-cols-2 items-center gap-8">
<div>
<h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
Ireland’s Premium <span style={{ color: 'var(--amber)' }}>Dry Hire</span> Mobile Bar
</h1>
<p className="mt-4 text-neutral-700">Weddings • Corporate • Private Parties • Festivals</p>
<div className="mt-6 flex gap-3">
<Link to="/book" className="btn btn-primary">Request a Booking</Link>
<Link to="/services" className="btn border">View Packages</Link>
</div>
</div>
<div className="card">
<div className="aspect-video bg-neutral-200 rounded-xl grid place-items-center text-neutral-500">
{/* Replace with your real trailer image */}
<span>Trailer Image Placeholder</span>
</div>
<p className="mt-3 text-sm text-neutral-600">Add your real photos in the Gallery page.</p>
</div>
</section>
);
}