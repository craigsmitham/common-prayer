import { createHonoServer } from 'react-router-hono-server/node';
import { Hono } from 'hono';

console.log('creating hono server');
const server = await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});

export const handle =
  (app: Hono<any, any, any>) =>
  (req: Request): Response | Promise<Response> => {
    console.log('request URL', req.url);
    return app.fetch(req);
  };

console.log('creating vercel handler for hono server');
const vercelServer = handle(server);

console.log('exporting vercel server', process.env);
export default vercelServer;
