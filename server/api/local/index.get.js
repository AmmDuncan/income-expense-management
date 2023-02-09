import Local from '~~/server/models/local';

/**
 * Fetches all locals
 */
export default defineEventHandler(async (event) => {
  try {
    const locals = await Local.find();
    return {
      status: 200,
      message: 'Locals retreived successfully',
      data: locals
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
