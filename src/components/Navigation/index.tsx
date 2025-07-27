import { NavLink } from 'react-router';

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      {' | '}
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}
