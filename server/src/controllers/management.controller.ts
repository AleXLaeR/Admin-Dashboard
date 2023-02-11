import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import { User, Transaction } from '@src/models';

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(StatusCodes.OK).json(admins);
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

export const getUserPerformance = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params as { id: string };

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats',
        },
      },
      { $unwind: '$affiliateStats' },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((_id: string) =>
        Transaction.findById(_id),
      ),
    );
    const filteredSaleTransactions = saleTransactions.filter((transact) => !!transact);

    res.status(StatusCodes.OK).json({
      user: userWithStats[0],
      sales: filteredSaleTransactions,
    });
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};
