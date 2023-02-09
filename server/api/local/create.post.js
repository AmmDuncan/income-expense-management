import Local from '~~/server/models/local';
import AuthHelper from '~~/server/helpers/auth.helper';

const { checkDefaultAdmin } = AuthHelper;
/**
 * Creates a local branch
 */
export default defineEventHandler(async (event) => {
  try {
    const { authorization } = event.node.req.headers;
    const userObj = verifyToken(authorization);
    if (!checkDefaultAdmin(userObj)) {
      return {
        status: 403,
        message: 'You do not have enough permissions',
        data: null
      };
    }
    const body = await readBody(event);
    const local = await Local.create(body);
    return {
      status: 201,
      message: 'Local created successfully',
      data: local
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
