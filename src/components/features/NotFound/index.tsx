import { NavLink } from 'react-router';

export default function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <NavLink to={'/'}>Go Back!</NavLink>
    </>
  );
}
