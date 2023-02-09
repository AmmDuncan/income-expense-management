import User from '~~/server/models/user';
import AuthHelper from '~~/server/helpers/auth.helper';

const { checkDefaultAdmin, verifyToken } = AuthHelper;

/**
 * Deletes a user
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
    await User.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
      data: null
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
