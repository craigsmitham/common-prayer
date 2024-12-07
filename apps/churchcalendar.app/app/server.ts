import { createHonoServer } from 'react-router-hono-server/node';
import { Hono } from 'hono';

const server = await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});

const hdl =
  (app: Hono<any, any, any>) =>
  async (req: Request): Promise<Response> => {
    try {
      const newUrl = new URL('https://' + process.env.VERCEL_URL + req.url);
      const newReq = new Request(newUrl, req);
      console.log('about to handle request', newReq.url);
      const response = await app.fetch(newReq);
      console.log('successfully handled request', newReq.url);
      return response;
    } catch (err) {
      console.error('error handling', err);
      throw err;
    }
  };

const vercelServer = hdl(server);

export default vercelServer;
