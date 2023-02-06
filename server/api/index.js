import get from "../controllers/default/get";

export default defineEventHandler((event) => {
  const handlers = {
    get,
  };
  const method = event.node.req.method.toLowerCase();
  return handlers[method](event);
});
