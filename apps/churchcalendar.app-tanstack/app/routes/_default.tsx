import * as React from 'react';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_default')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-white">
      <h1>Church Calendar App</h1>
      <hr />
      <Outlet />
      <hr />
      <ul>
        <li>
          <Link to={'/c/today'}>Today</Link>
        </li>

        <li>
          <Link to={'/connect'}>Connect</Link>
        </li>
        <li>
          <Link to={'/subscribe'}>Subscribe</Link>
        </li>

        <li>
          <Link to={'/about'}>About</Link>
        </li>
      </ul>
    </div>
  );
}
