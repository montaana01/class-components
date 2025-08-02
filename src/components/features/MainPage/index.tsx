import Navigation from '../../Navigation';
import { ErrorButton } from '../../error/ErrorButton';
import { Outlet } from 'react-router';

export default function MainPage() {
  return (
    <header className="App">
      <h1>Class-component React App</h1>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <ErrorButton />
    </header>
  );
}
