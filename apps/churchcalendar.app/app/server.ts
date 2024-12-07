import { createHonoServer } from "react-router-hono-server/node";
import { Hono } from "hono";

const hono = new Hono();
console.log('hmm', hono)

export default await createHonoServer({
  configure: (server) => {
    server.get('/api/test', (c) => {
      return c.text('hello world');
    });
  },
});
