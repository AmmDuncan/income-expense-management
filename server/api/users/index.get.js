import User from '~~/server/models/user';

/**
 * Fetches all users
 */
export default defineEventHandler(async (event) => {
  try {
    const users = await User.find();
    return {
      status: 200,
      message: 'Users retreived successfully',
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
