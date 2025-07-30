import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/error/ErrorBoundary';

const rootElement: HTMLDivElement = document.createElement('div');
rootElement.id = 'root';
rootElement.dataset.testid = 'root-element';
document.body.append(rootElement);

createRoot(rootElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
