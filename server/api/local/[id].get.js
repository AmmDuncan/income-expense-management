import Local from '~~/server/models/local';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const local = await Local.findById(id);
    return {
      status: 200,
      message: 'User retreived successfully',
      data: {
        local
      }
    };
  } catch (e) {
    return {
      status: 400,
      message: 'Something went horribly wrong',
      data: null
    };
  }
});
