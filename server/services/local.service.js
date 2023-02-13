import Local from '../models/local';
import GenServices from './generic.service';

const { resolveAggregateQueryPagination } = GenServices;

/**
 * @Class LocalServices
 */
class LocalServices {
  /**
   * Fetches all locals
   * @param {Number} page - page number
   * @returns {Promise | null}
   */
  static async fetchAllLocals(page) {
    return Local.aggregate([
      {
        $match: {}
      },
      ...resolveAggregateQueryPagination(page)
    ]);
  }

  /**
   *
   * @param {String} keyword - word to search by
   * @param {Number} page - page number
   * @returns {Promise | null}
   */
  static async searchAllLocals(keyword, page) {
    return Local.aggregate([
      {
        $match: {
          name: { $regex: keyword, $options: 'i' }
        }
      },
      ...resolveAggregateQueryPagination(page)
    ]);
  }
}

export default LocalServices;
