import User from '~~/server/models/user';

export default defineEventHandler(async (event) => {
  const users = await User.find();
  return {
    status: 200,
    message: 'Users retreived successfully',
    data: users
  };
});
