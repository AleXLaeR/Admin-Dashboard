import mongoose from 'mongoose';

type OverallStatsCategorySales = {
  type: Map<string, any>;
  of: number;
};

interface OverallStatsModel {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
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
  }[];
  salesByCategory: OverallStatsCategorySales;
}

const OverallStatSchema = new mongoose.Schema<OverallStatsModel>(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: {
      type: 'number',
      required: false,
      default: 2023,
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true },
);

const OverallStats = mongoose.model('OverallStats', OverallStatSchema);
export default OverallStats;
