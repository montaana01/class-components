import Container from './components/Container';
import './index.scss';
import SearchContainer from './components/SearchContainer';
import { ErrorButton } from './components/error/ErrorButton';

function App() {
  return (
    <Container>
      <h1>Class-component React App</h1>
      <SearchContainer />
      <ErrorButton />
    </Container>
  );
}

export default App;
