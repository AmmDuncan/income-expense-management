import Local from '~~/server/models/local';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const local = await Local.create(body);
    return {
      status: 201,
      message: 'Local created successfully',
      data: local
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
