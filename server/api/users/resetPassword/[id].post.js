import UserServices from '~~/server/services/user.service';

const { resetPassword } = UserServices;

/**
 * Resets password
 */
export default defineEventHandler(async (event) => {
  try {
    const { authorization } = event.node.req.headers;
    const body = await readBody(event);
    const { status, message, data } = resetPassword(body, authorization);
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
