import Transaction from '~~/server/models/transaction';

/**
 * Fetches all transactions
 */
export default defineEventHandler(async (event) => {
  try {
    const transactions = await Transaction.find();
    return {
      status: 200,
      message: 'Transactions retreived successfully',
      data: transactions
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
