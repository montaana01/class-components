import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SearchContainer from './components/SearchContainer';
import AboutApp from './components/features/AboutApp';
import NotFound from './components/features/NotFound';
import './index.scss';
import MainPage from './components/features/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Navigate to={'search?page=1'} replace />} />
            <Route path="search" element={<SearchContainer />} />
            <Route path="about" element={<AboutApp />} />
            <Route path={'*'} element={<NotFound />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
