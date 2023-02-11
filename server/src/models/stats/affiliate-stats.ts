import mongoose from 'mongoose';

type AffiliateStatsField = {
  type: mongoose.Types.ObjectId;
  ref: 'User' | 'Transaction';
};

interface AffiliateStatsModel {
  userId: AffiliateStatsField;
  affiliateSales: AffiliateStatsField;
}

const AffiliateStatSchema = new mongoose.Schema<AffiliateStatsModel>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: 'Transaction',
    },
  },
  { timestamps: true },
);

const AffiliateStats = mongoose.model('AffiliateStats', AffiliateStatSchema);
export default AffiliateStats;
