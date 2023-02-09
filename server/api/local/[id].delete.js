import Local from '~~/server/models/local';

/**
 * Deletes a local branch
 */
export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    await Local.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'Local deleted successfully',
      data: null
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
