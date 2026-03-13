import { Link, Outlet } from 'react-router-dom';

const links = [
  ['/', 'Portfolio Builder'],
  ['/overview', 'Overview'],
  ['/companies', 'Companies'],
  ['/sectors', 'Sectors'],
  ['/countries', 'Countries'],
  ['/overlap', 'Overlap'],
  ['/simulator', 'Simulator']
] as const;

export const AppLayout = () => (
  <div className="layout">
    <aside>
      <h1>ETF Source</h1>
      <nav>
        {links.map(([to, label]) => (
          <Link key={to} to={to}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
    <main>
      <Outlet />
    </main>
  </div>
);
