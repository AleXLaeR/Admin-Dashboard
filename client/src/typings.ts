export type Theme = 'dark' | 'light';

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

export interface AppUser extends UserAddress, UserContactData {
  password: string;
  occupation: string;
  role: string;
  transactions: unknown[];
}
