import User from '~~/server/models/user';

/**
 * Adds a user to a local branch
 */
export default defineEventHandler(async (event) => {
  try {
    const { authorization } = event.node.req.headers;
    const userObj = verifyToken(authorization);
    if (!checkDefaultAdmin(userObj)) {
      return {
        status: 403,
        message: 'You do not have permision',
        data: null
      };
    }
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
      message: e.message,
      data: null
    };
  }
});
