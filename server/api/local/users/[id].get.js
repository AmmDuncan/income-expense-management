import User from '~~/server/models/user';

/**
 * Gets all users on a local branch
 */
export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const users = await User.find({ local: id });
    return {
      status: 200,
      message: 'Users on this local retreived successfully',
      data: users
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
