import Balance from '~~/server/models/balance';
import Transaction from '~~/server/models/transaction';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const transaction = await Transaction.create(body);
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const balance = await Balance.findOne({ month, year });
    if (!balance) {
      balance = await Balance.create({
        month,
        year,
        local: body.local
      });
    }
    if (transaction.type == 'income') balance.amount += transaction.amount;
    else balance.amount -= transaction.amount;
    balance.save();
    return {
      status: 201,
      message: 'Transaction created successfully',
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
