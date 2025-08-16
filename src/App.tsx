import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Container from './components/Container';
import SearchContainer from './components/SearchContainer';
import AboutApp from './components/features/AboutApp';
import NotFound from './components/features/NotFound';
import './index.scss';
import MainPage from './components/features/MainPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route
                index
                element={<Navigate to={'search?page=1'} replace />}
              />
              <Route path="search" element={<SearchContainer />} />
              <Route path="about" element={<AboutApp />} />
              <Route path={'*'} element={<NotFound />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
