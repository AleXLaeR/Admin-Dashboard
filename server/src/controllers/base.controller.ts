import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User, OverallStats, Transaction } from '@src/models';

export const getUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const user = await User.findById(id);

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

const { currentYear, currentMonth, currentDay } = {
  currentYear: 2021,
  currentMonth: 'November',
  currentDay: '2021-11-15',
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    /* Recent Transactions */
    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStats.find({ year: currentYear });

    const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory } =
      overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(StatusCodes.OK).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};
