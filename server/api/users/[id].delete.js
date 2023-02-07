import User from '~~/server/models/user';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    await User.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
      data: null
    };
  } catch (e) {
    return {
      status: 400,
      message: 'Something went horribly wrong',
      data: null
    };
  }
});
