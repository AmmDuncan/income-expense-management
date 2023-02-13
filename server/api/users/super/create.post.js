import UserServices from '~~/server/services/user.service';

const { createSuperUser } = UserServices;

/**
 * Creates a superUser
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { status, message, data } = createSuperUser(body);
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
