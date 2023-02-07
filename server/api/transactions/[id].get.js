import Transaction from '~~/server/models/transaction';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const transaction = await Transaction.findById(id);
    return {
      status: 200,
      message: 'Transaction retreived successfully',
      data: transaction
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
