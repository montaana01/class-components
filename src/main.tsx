import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

createRoot(root).render(<App />);
