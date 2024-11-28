import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Day,
  EventType,
  getEventsForEasterIsoYear,
} from 'common-prayer-lib/src/church-year/church-year';

export const Route = createFileRoute('/preview')({
  component: RouteComponent,
});

type PreviewEventType = Extract<EventType, 'Sunday'>;

function getDays(type: PreviewEventType) {
  const events = getEventsForEasterIsoYear(2024).filter((t) => t.type === type);
}

function RouteComponent() {
  const events = getEventsForEasterIsoYear(2024);
  const preview = ({ date: { year, month, day } }: Day<any, any>) => (
    <iframe src={`/c/${year}/${month}/${day}`}></iframe>
  );
  return (
    <div>
      <div>Advent</div>
      <div>Christmas</div>
      <div>Epiphany</div>
      <div>Lent</div>
      <div>Easter</div>
      <div>Trinity</div>
    </div>
  );
}
