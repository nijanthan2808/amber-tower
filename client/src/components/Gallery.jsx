import React from 'react';


export default function Gallery({ images = [] }) {
const pics = images.length ? images : new Array(6).fill(0).map((_, i) => ({
src: `https://picsum.photos/seed/amber${i}/800/600`,
alt: `Trailer ${i+1}`,
}));
return (
<section className="section">
<h2 className="text-2xl font-bold mb-6">Gallery</h2>
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
{pics.map((p, i) => (
<img key={i} src={p.src} alt={p.alt} className="rounded-xl w-full h-48 object-cover" />
))}
</div>
</section>
);
}