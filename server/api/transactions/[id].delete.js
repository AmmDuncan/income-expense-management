import Transaction from '~~/server/models/transaction';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    await Transaction.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'Transaction deleted successfully',
      data: null
    };
  } catch (e) {
    return {
      status: 400,
      message: e.message,
      data: null
    };
  }
});
