import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import * as mongoose from 'mongoose';

/* DATA MOCKING */
import {
  dataAffiliateStat,
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from '@src/data';
import {
  Product,
  User,
  AffiliateStats,
  OverallStats,
  ProductStats,
  Transaction,
} from '@src/models';
/* ------------ */

import { baseRoutes, clientRoutes, salesRoutes, managementRoutes } from '@routes/index';

/* CONFIGURATION */
dotenv.config({ path: '.env.local' });
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/sales', salesRoutes);
app.use('/management', managementRoutes);
app.use('/', baseRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8080;

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URL!)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });

    /* ONLY INSERT MOCKS ONCE TO AVOID DUPLICATING THE DATA */
    /* await Promise.all([
      Product.insertMany(dataProduct),
      ProductStats.insertMany(dataProductStat),
      OverallStats.insertMany(dataOverallStat),
      AffiliateStats.insertMany(dataAffiliateStat),
      Transaction.insertMany(dataTransaction),
      User.insertMany(dataUser),
    ]);
     */
  })
  .catch((error) => {
    console.log(`There was an error establishing mongodb connection: ${error}`);
  });
