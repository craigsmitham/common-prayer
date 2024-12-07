import { createHonoServer } from 'react-router-hono-server/node';
import { handle } from 'hono/vercel';

const server = await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});

export default handle(server);
