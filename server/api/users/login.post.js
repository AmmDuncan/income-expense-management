import UserServices from '~~/server/services/user.service';

const { login } = UserServices;
/**
 * Logs a user in
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { status, message, data } = login(body);
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
