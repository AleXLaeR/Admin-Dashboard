import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import getCountryIso3 from '@services/CountryIso.service';
import { IProduct, Product, ProductStats, User, Transaction } from '@src/models';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => ({
        ...(product as IProduct),
        stat: await ProductStats.find({ productId: product._id }),
      })),
    );

    res.status(StatusCodes.OK).json(productsWithStats);
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json(customers);
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

type Sort = {
  field: string;
  sort?: string | null;
};

type MongoDbSort = { [sort: string]: 1 | -1 };

type QuerySort = {
  page: number;
  pageSize: number;
  sort: string;
  search: string;
};

export const getTransactions = async ({ query }: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = '' } = query as Partial<QuerySort>;

    const generateSort = (): MongoDbSort => {
      if (!sort) return {};

      const { field, sort: parsedSort } = JSON.parse(sort) as Sort;
      return { [field]: parsedSort === 'asc' ? 1 : -1 };
    };

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(generateSort())
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: 'i' },
    });

    res.status(StatusCodes.OK).json({
      transactions,
      total,
    });
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

export const getGeography = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3] += 1;
      return acc;
    }, {} as Record<string, number>);

    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => ({
      id: country,
      value: count,
    }));

    res.status(StatusCodes.OK).json(formattedLocations);
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};
