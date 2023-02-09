import User from '~~/server/models/user';

/**
 * Removes a user from a local branch
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
      message: e.message,
      data: null
    };
  }
});
