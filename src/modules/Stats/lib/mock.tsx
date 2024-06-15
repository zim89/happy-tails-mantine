import { UsersRound, ShoppingCart, Wallet, Banknote } from 'lucide-react';

export const data = [
  {
    type: 'decimal',
    name: 'New Users',
    value: 32,
    todayIncome: 1,
    icon: UsersRound,
  },
  {
    type: 'decimal',
    name: 'Orders',
    value: 166,
    todayIncome: 3,
    icon: ShoppingCart,
  },
  {
    type: 'currency',
    name: 'Average Order Value',
    value: 32,
    todayIncome: 0,
    icon: Wallet,
  },
  {
    type: 'currency',
    name: 'Total Profit',
    value: 324026,
    todayIncome: 3,
    icon: Banknote,
  },
];
