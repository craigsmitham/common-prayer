import { createHonoServer } from 'react-router-hono-server/node';
import { handle } from 'hono/vercel';
import { Hono } from 'hono';

export const config = {
  runtime: 'edge',
};

const app: Hono = await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});

export default handle(app);
