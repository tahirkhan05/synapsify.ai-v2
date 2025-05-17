
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'framer-motion'  // Ensure Framer Motion is loaded

createRoot(document.getElementById("root")!).render(<App />);
