import { Suspense } from 'react';
import { Loader } from './components/Loader';
import { CountryList } from './components/CountryList';

function App() {
  return (
    <>
      <header className="header">
        <h1>React Performance — CO2</h1>
      </header>
      <Suspense fallback={<Loader />}>
        <CountryList />
      </Suspense>
      <footer>
        <div className="container">
          <h3>
            Made by{' '}
            <a href="https://linkedin.com/in/yakovlevdeveloper">
              Alexey Yakovlev
            </a>
          </h3>
          <h4>© {new Date().getFullYear()} | Minsk, Belarus</h4>
        </div>
      </footer>
    </>
  );
}

export default App;
