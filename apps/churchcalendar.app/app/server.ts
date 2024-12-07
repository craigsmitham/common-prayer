import { createHonoServer } from 'react-router-hono-server/node';

export default await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});
