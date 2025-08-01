import { Link } from 'react-router';

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
      <Link to="/">← Back to Search</Link>
    </div>
  );
}
