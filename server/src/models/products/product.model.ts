import * as mongoose from 'mongoose';

export interface ProductModel {
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
}

const ProductSchema = new mongoose.Schema<ProductModel>(
  {
    title: {
      type: 'string',
      required: false,
      default: 'Some Product',
      min: 10,
      trim: true,
    },
    price: {
      type: 'number',
      required: true,
      min: 0.25,
    },
    description: {
      type: 'string',
      required: false,
      default: null,
    },
    category: {
      type: 'string',
      required: true,
      max: 100,
    },
    rating: {
      type: 'number',
      required: false,
      default: 1,
    },
    supply: {
      type: 'number',
      required: false,
      default: 0,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model<ProductModel>('Product', ProductSchema);
export default Product;
