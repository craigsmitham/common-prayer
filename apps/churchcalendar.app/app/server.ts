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

console.log('creating vercel handler for hono server');
const vercelServer = handle(server);

console.log('exporting vercel server');
export default vercelServer;
