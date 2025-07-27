import { Link } from 'react-router';

export default function Navigation() {
  return (
    <nav>
      <Link to={'/about'}>{'About App'}</Link>
    </nav>
  );
}
