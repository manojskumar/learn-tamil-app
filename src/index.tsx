import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// If you have a global CSS file you want Vite to bundle (e.g., src/index.css)
// import './index.css'; 
// For now, we are using the index.css from public, linked in index.html

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // The path to sw.js will be relative to the deployed site's root,
    // considering the 'base' in vite.config.ts.
    // For example, if base is '/learn-tamil-app/', then this resolves to
    // 'https://username.github.io/learn-tamil-app/sw.js'
    navigator.serviceWorker.register('sw.js', { scope: '/learn-tamil-app/' })
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
