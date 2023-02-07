import User from '~~/server/models/user';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const user = User.findOneAndUpdate({ _id: id }, { local: null });
    return {
      status: 200,
      message: 'User removed successfully',
      data: {
        user
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
