import { Router } from 'express';

import { getDashboardStats, getUser } from '@controllers/base.controller';

const router = Router();

router.get('/user/:id', getUser);
router.get('/dashboard', getDashboardStats);

export default router;
