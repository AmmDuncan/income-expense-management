import Local from '~~/server/models/local';
import LocalServices from '~~/server/services/local.service';
import GenServices from '~~/server/services/generic.service';

const { fetchAllLocals, searchAllLocals } = LocalServices;
const { calcNoOfPages } = GenServices;

/**
 * Fetches all locals
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (body.keyword) {
      const [{ data, total }] = await searchAllLocals(body.keyword, body.page);
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
      };
    }
    const [{ data, total }] = await fetchAllLocals(body.page);
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
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
