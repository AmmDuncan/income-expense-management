import UserServices from '~~/server/services/user.service';

const { signUp } = UserServices;
/**
 * Creates a new user
 */
export default defineEventHandler(async (event) => {
  try {
    const { authorization } = event.node.req.headers;
    const body = await readBody(event);
    const { status, message, data } = signUp(body, authorization);
    return {
      status,
      message,
      data
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
