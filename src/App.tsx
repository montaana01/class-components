import { Route, Routes } from 'react-router';
import Container from './components/Container';
import SearchContainer from './components/SearchContainer';
import { ErrorButton } from './components/error/ErrorButton';
import Navigation from './components/Navigation';
import AboutApp from './components/AboutApp';
import NotFound from './components/NotFound';
import './index.scss';

function App() {
  //Todo: rebuild this component to pretty view
  return (
    <Container>
      <header className="App">
        <h1>Class-component React App</h1>
        <Navigation />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<SearchContainer />} />
          <Route path="/about" element={<AboutApp />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </main>

      <ErrorButton />
    </Container>
  );
}

export default App;
