import UserServices from '~~/server/services/user.service';

const { signUp } = UserServices;
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return signUp(body);
  } catch (e) {
    return e.message;
  }
});
