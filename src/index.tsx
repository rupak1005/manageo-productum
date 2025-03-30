
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Detect user's preferred color scheme and apply it immediately
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
