import { createHonoServer } from 'react-router-hono-server/node';
import { handle } from 'hono/vercel';
import { Hono } from 'hono';

export default await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});
