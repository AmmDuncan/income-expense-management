import Local from '~~/server/models/local';

export default defineEventHandler(async (event) => {
  const locals = await Local.find();
  return {
    status: 200,
    message: 'Users retreived successfully',
    data: locals
  };
});
