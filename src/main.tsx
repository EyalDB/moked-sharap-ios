import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Cache buster timestamp
console.log('App version: 2026-01-30-v2');

createRoot(document.getElementById("root")!).render(<App />);
