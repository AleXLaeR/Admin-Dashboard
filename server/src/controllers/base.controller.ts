import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '@models/user.model';

// eslint-disable-next-line import/prefer-default-export
export const getUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const user = await User.findById(id);

    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};
