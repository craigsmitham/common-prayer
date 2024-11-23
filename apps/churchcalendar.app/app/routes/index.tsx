// app/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

// @ts-ignore
const link = <a href={"/api/ical"}>{window.location.host}/api/ical</a>;
function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Church Calendar</h1>
      <div>Subscribe via ical: {link} </div>
    </div>
  );
}
