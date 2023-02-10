import * as mongoose from 'mongoose';

interface UserAddress {
  city: string;
  state: string;
  country: string;
}

interface UserContactData {
  name: string;
  email: string;
  phoneNumber: string;
}

interface UserModel extends UserAddress, UserContactData {
  password: string;
  occupation: string;
  role: string;
  transactions: unknown[];
}

const UserSchema = new mongoose.Schema<UserModel>(
  {
    name: {
      type: 'string',
      required: true,
      min: 2,
      max: 100,
      trim: true,
    },
    email: {
      type: 'string',
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      min: 8,
    },
    city: {
      type: 'string',
      required: false,
      default: null,
    },
    country: {
      type: 'string',
      required: true,
    },
    state: {
      type: 'string',
      required: false,
    },
    occupation: {
      type: 'string',
      required: false,
      default: null,
    },
    role: {
      type: 'string',
      required: false,
      enum: ['user', 'admin', 'superadmin'],
      default: 'admin',
    },
    transactions: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<UserModel>('User', UserSchema);
export default User;
