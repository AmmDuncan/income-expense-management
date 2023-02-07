import User from '~~/server/models/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = event.context.params.id;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { local: body.localId }
    );
    return {
      status: 200,
      message: 'User added to local successfully',
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
