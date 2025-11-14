/*
# The Amber Tower — React + Express (SQLite) Booking MVP


## Prereqs
- Node.js 18+


## 1) Backend
```
cd server
cp .env.example .env
# edit CLIENT_ORIGIN if needed
npm i
npm run dev
```
API: http://localhost:5174/api


## 2) Frontend
```
cd ../client
npm i
# optional: set VITE_API_BASE in a .env file
npm run dev
```
Site: http://localhost:5173


## Admin
- Visit /admin
- Enter ADMIN_PASSWORD from server .env
- Accept/Reject/Pending updates send optional emails if SMTP is configured.


## Deploy notes
- Host server on Render/Fly/railway (persistent volume for SQLite)
- Host client on Vercel/Netlify; set VITE_API_BASE to your server URL
- Configure CORS and JWT secrets in env


## Replace placeholder images
- Edit Gallery component to use your real trailer photos.
*/