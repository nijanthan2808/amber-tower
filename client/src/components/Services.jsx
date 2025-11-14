import React from 'react';


const packages = [
{ name: 'Dry Hire Only', desc: 'Bar trailer with fridges, taps, counters.', duration: 'Full day', price: 450 },
{ name: 'Dry Hire + Staff', desc: 'Trailer + 2 staff for service.', duration: 'Full day', price: 650 },
{ name: 'Wedding Setup', desc: 'Decor, glasses, setup support.', duration: 'Per event', price: 850 },
];


export default function Services() {
return (
<section className="section">
<h2 className="text-2xl font-bold">Services & Pricing</h2>
<p className="text-neutral-600 mt-2">Transparent pricing with tailored add-ons available on request.</p>
<div className="grid md:grid-cols-3 gap-4 mt-6">
{packages.map((p) => (
<div className="card" key={p.name}>
<h3 className="text-lg font-semibold">{p.name}</h3>
<p className="text-neutral-600 mt-1">{p.desc}</p>
<p className="mt-2 text-sm">Duration: {p.duration}</p>
<p className="mt-4 text-2xl font-bold" style={{ color: 'var(--amber)' }}>€{p.price}</p>
</div>
))}
</div>
</section>
);
}