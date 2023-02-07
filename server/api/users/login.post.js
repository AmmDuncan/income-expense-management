import UserServices from '~~/server/services/user.service';

const { login } = UserServices;
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return login(body);
  } catch (e) {
    return e.message;
  }
});
