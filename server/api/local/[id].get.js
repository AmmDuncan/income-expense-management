import Local from '~~/server/models/local';

/**
 * Fetches a single local branch by id
 */
export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const local = await Local.findById(id);
    return {
      status: 200,
      message: 'Local retreived successfully',
      data: {
        local
      }
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
