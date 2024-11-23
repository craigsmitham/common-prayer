// app/routes/index.tsx
import {
  createFileRoute,
  useLocation,
  useRouter,
} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

// @ts-ignore
function Home() {
  const router = useRouter();

  const icalUrl = window.location.hostname + '/api/ical';

  return (
    <div>
      <h1>Church Calendar</h1>

      <div>
        Subscribe via ical: <a href={icalUrl}>{icalUrl}</a>
      </div>
    </div>
  );
}
