import { Link, Route, Routes } from 'react-router';
import Container from './components/Container';
import SearchContainer from './components/SearchContainer';
import { ErrorButton } from './components/error/ErrorButton';
import Navigation from './components/Navigation';
import AboutApp from './components/AboutApp';
import './index.scss';

function App() {
  //Todo: rebuild this component to pretty view
  return (
    <Container>
      <div className="App">
        <Link to={'/'}>
          <h1>Class-component React App</h1>
        </Link>
        <Navigation />
      </div>
      <Routes>
        <Route path={'about'} element={<AboutApp />} />
        <Route path={'/'} element={<SearchContainer />} />
      </Routes>
      <ErrorButton />
    </Container>
  );
}

export default App;
