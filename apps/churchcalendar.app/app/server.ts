import { createHonoServer } from 'react-router-hono-server/node';
import { handle } from 'hono/vercel';

console.log('creating hono server');
const server = await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});

console.log('exporting server inside vercel handler');
export default handle(server);
