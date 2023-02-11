import { Router } from 'express';

import {
  getGeography,
  getCustomers,
  getTransactions,
  getProducts,
} from '@controllers/client.controller';

const router = Router();

router.get('/products', getProducts);
router.get('/customers', getCustomers);
router.get('/transactions', getTransactions);
router.get('/geography', getGeography);

export default router;
