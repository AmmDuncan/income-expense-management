import Balance from '~~/server/models/balance';
import Transaction from '~~/server/models/transaction';

/**
 * Creates a new transaction and updates the balance
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { authorization } = event.node.req.headers;
    const userObj = verifyToken(authorization);
    if (userObj.local !== body.local) {
      return {
        status: 403,
        message: 'You do not have enough permissions',
        data: null
      };
    }
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
