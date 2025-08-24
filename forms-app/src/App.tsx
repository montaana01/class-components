import { useState } from 'react';
import { Container } from '@/components/Container';
import '@/assets/styles/global.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="header">
        <Container>
          <div className="header_wrapper">
            <h1>Vite + React</h1>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
        </Container>
      </main>
      <footer>
        <Container>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
