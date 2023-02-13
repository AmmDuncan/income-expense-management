import User from '~~/server/models/user';
import UserServices from '~~/server/services/user.service';
import GenServices from '~~/server/services/generic.service';

const { fetchAllUsers, searchAllUsers } = UserServices;
const { calcNoOfPages } = GenServices;
/**
 * Fetches all users
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (body.keyword) {
      const [{ data, total }] = await searchAllUsers(body.keyword, body.page);
      const hasNextPage = total ? calcNoOfPages(total) > page : null;
      const pageCount = calcNoOfPages(total);
      const totalCount = total;
      return {
        status: 200,
        message: 'Users retreived successfully',
        hasNextPage,
        totalCount,
        pageCount,
        data
      }
    }
    const [{ data, total }] = await fetchAllUsers(body.page);
    const hasNextPage = total ? calcNoOfPages(total) > page : null;
    const pageCount = calcNoOfPages(total);
    const totalCount = total;
    return {
      status: 200,
      message: 'Users retreived successfully',
      hasNextPage,
      totalCount,
      pageCount,
      data
    }
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
