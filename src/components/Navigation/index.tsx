import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <NavLink to="search?page=1" end>
        Home
      </NavLink>
      {' | '}
      <NavLink to="about">About</NavLink>
    </nav>
  );
}
