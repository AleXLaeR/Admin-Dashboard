import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '@models/user.model';

// eslint-disable-next-line import/prefer-default-export
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const user = await User.findById(id);

    res.send(StatusCodes.OK).json(user);
  } catch (error: unknown) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};
