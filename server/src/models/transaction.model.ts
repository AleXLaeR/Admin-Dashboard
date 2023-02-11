import mongoose from 'mongoose';

type TransactionProducts = {
  type: mongoose.Types.ObjectId[];
  of: number;
};

interface TransactionModel {
  userId: string;
  cost: string;
  products: TransactionProducts;
}

const TransactionSchema = new mongoose.Schema<TransactionModel>(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
