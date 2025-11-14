import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import BookPage from './pages/BookPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ContactPage from './pages/ContactPage.jsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'book', element: <BookPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
);