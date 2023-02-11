import * as mongoose from 'mongoose';

interface ProductStatsModel {
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSold: number;
  year: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  dailyData: {
    date: string;
    totalSales: number;
    totalUnits: number;
  };
}

const ProductSchema = new mongoose.Schema<ProductStatsModel>(
  {
    productId: {
      type: 'string',
      required: true,
    },
    yearlySalesTotal: {
      type: 'number',
      required: false,
      min: 0,
      default: 0,
    },
    yearlyTotalSold: {
      type: 'number',
      required: false,
      min: 0,
      default: 0,
    },
    year: {
      type: 'number',
      required: false,
      default: 2023,
      min: 2015,
    },
    monthlyData: [
      {
        month: 'string',
        totalSales: 'number',
        totalUnits: 'number',
      },
    ],
    dailyData: {
      date: 'string',
      totalSales: 'number',
      totalUnits: 'number',
    },
  },
  { timestamps: true },
);

const ProductStats = mongoose.model<ProductStatsModel>('ProductStats', ProductSchema);
export default ProductStats;
