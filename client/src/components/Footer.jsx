import React from 'react';
export default function Footer() {
  return (
    <footer className="border-t">
      <div className="section text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} The Amber Tower • Tramore/Waterford, Ireland</p>
        <div className="flex items-center gap-4">
          <p>
            Contact: <a className="underline" href="mailto:nj@theambertower.com">nj@theambertower.com</a> • 085 730 1544
          </p>
          <div className="socialmedia">
            <a href="https://instagram.com/the_amber_tower" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:brightness-110" title="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor"/>
                <path d="M16.5 7.5h.01" stroke="currentColor"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor"/>
              </svg>
            </a>
            <a href="https://facebook.com/theambertower" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:brightness-110" title="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M13 10h3V7h-3c-1.657 0-3 1.343-3 3v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.552.448-1 1-1Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
