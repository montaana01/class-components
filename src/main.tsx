import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';

const rootElement: HTMLDivElement = document.createElement('div');
rootElement.id = 'root';
rootElement.dataset.testid = 'root-element';
document.body.append(rootElement);

createRoot(rootElement).render(<App />);
