import { createHonoServer } from 'react-router-hono-server/node';
import { Hono } from 'hono';

try {
  const hono = new Hono();
} catch (error) {
  throw new Error('hono problem');
}

export default await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});
