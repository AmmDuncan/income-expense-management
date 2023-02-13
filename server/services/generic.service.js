/**
 * @Class GenServices
 */
class GenServices {
  /**
   * resolveAggregateQueryPagination
   * @param {number} page - specify page to fetch
   * @returns {Promise | null} - Resolves or rejects the data
   */
  static resolveAggregateQueryPagination(page) {
    const firstStage = [
      {
        $facet: page
          ? {
              metadata: [{ $count: 'total' }],
              data: [{ $skip: (page - 1) * 10 }, { $limit: 10 }]
            }
          : { data: [{ $skip: 0 }] }
      }
    ];
    const secondStage = page
      ? [
          {
            $project: {
              total: {
                $cond: [
                  { $eq: ['$metadata', []] },
                  0,
                  { $arrayElemAt: ['$metadata.total', 0] }
                ]
              },
              data: 1
            }
          }
        ]
      : [];
    return [...firstStage, ...secondStage];
  }

  /**
   * calcNoOfPages - calculates the number of pages
   * @param {total} total total number of entries
   * @param {limit} limit limit requested, default 10
   * @returns {int} number of page
   */
  static calcNoOfPages(total, limit = 10) {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  }
}

export default GenServices;
