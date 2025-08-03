import { NavLink } from 'react-router-dom';

export default function AboutApp() {
  return (
    <div className="about">
      <h2>About this App</h2>
      <p>Author: Alexey Yakovlev</p>
      <p>
        [React Course [2025] -{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School
        </a>
        ]
      </p>
      <NavLink to="/">← Back to Search</NavLink>
    </div>
  );
}
