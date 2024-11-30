// app/routes/index.tsx
import { createFileRoute, useRouter } from '@tanstack/react-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { DayViewComponent } from '../../components/DayViewComponent';

export const Route = createFileRoute('/_default/')({
  component: Home,
});

// @ts-ignore
function Home() {
  const router = useRouter();

  const [hostname, setHostname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.origin);
    }
  });

  const icalUrl = hostname + '/a/ical';

  return (
    <div>
      <h1>Church Calendar</h1>
      <DayViewComponent date={Temporal.Now.plainDateISO()} />
      <hr />
      Subscribe via ical: <a href={icalUrl}>{icalUrl}</a>
    </div>
  );
}
