import Navigation from '../../Navigation';
import { ErrorButton } from '../../error/ErrorButton';
import { Outlet } from 'react-router';

export default function MainPage() {
  return (
    <>
      <header className="header">
        <h1>Rick&Morty React App</h1>
        <Navigation />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer>
        <ErrorButton />
      </footer>
    </>
  );
}
