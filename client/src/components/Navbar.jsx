import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Navbar() {
const link = 'px-3 py-2 rounded-xl hover:bg-neutral-100';
const active = ({ isActive }) => (isActive ? 'bg-neutral-100 ' + link : link);
return (
<header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
<div className="section flex items-center justify-between py-3">
<h1>
    <Link to="/" className="text-xl font-bold" style={{ color: 'var(--amber)' }}>
THE AMBER TOWER
</Link>
</h1>
<nav className="flex gap-1 text-sm">
<NavLink to="/" className={active} end>Home</NavLink>
<NavLink to="/gallery" className={active}>Gallery</NavLink>
<NavLink to="/services" className={active}>Services & Pricing</NavLink>
<NavLink to="/book" className="btn btn-primary">Request a Booking</NavLink>
<NavLink to="/contact" className={active}>Contact</NavLink>
</nav>
</div>
</header>
);
}