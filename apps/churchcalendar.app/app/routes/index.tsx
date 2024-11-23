// app/routes/index.tsx
import {
  createFileRoute,
  useLocation,
  useRouter,
} from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/')({
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

  const icalUrl = hostname + '/api/ical';

  return (
    <div>
      <h1>Church Calendar</h1>
      <div>
        Subscribe via ical: <a href={icalUrl}>{icalUrl}</a>
      </div>
    </div>
  );
}
