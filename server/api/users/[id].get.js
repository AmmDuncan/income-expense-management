import User from '~~/server/models/user';

/**
 * Fetches a user by id
 */
export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const user = await User.findById(id).populate('local');
    return {
      status: 200,
      message: 'User retreived successfully',
      data: user
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});