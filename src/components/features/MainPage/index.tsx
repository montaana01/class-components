import Navigation from '../../Navigation';
import { ErrorButton } from '../../error/ErrorButton';
import { Outlet } from 'react-router-dom';

const mainHeading = 'Rick&Morty React App';

export default function MainPage() {
  return (
    <>
      <header className="header">
        <h1>{mainHeading}</h1>
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
