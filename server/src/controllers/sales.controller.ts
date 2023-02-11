import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { OverallStats } from '@src/models';

// eslint-disable-next-line import/prefer-default-export
export const getSales = async (req: Request, res: Response) => {
  try {
    const overallStats = await OverallStats.find();

    res.status(StatusCodes.OK).json(overallStats[0]);
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};
