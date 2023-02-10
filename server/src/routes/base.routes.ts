import { Router, Request, Response } from 'express';

import { getUser } from '@controllers/base.controller';

const router = Router();

router.get('/user/:id', getUser);

export default router;
