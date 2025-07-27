import { Link } from 'react-router';

export default function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to={'/'}>Go Back!</Link>
    </>
  );
}
