import Transaction from "../models/transaction_model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("unAuthorized");
        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        console.error("Error getting transactions", err);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
      } catch (err) {
        console.error("Error getting transaction", err);
        throw new Error("Error getting transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
      } catch (err) {
        console.error("Error updating transaction:", err);
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
      } catch (err) {
        console.error("Error deleting transaction:", err);
        throw new Error("Error deleting transaction");
      }
    },
  },
};

export default transactionResolver;
