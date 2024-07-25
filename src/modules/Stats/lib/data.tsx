import { StatsMetrics } from '@/shared/api/dashboardApi';
import {
  UsersRound,
  ShoppingCart,
  Wallet,
  Banknote,
  LucideIcon,
} from 'lucide-react';

type StatPanel = {
  type: 'decimal' | 'currency';
  name: string;
  property: StatsMetrics;
  propertyInWeek: StatsMetrics;
  icon: LucideIcon;
};

export const data: StatPanel[] = [
  {
    type: 'decimal',
    name: 'New Users',
    property: 'userCount',
    propertyInWeek: 'userCountInWeek',
    icon: UsersRound,
  },
  {
    type: 'decimal',
    name: 'Orders',
    property: 'orderCount',
    propertyInWeek: 'orderCountInWeek',
    icon: ShoppingCart,
  },
  {
    type: 'currency',
    name: 'Average Order Value',
    property: 'averageOrder',
    propertyInWeek: 'averageOrderInWeek',
    icon: Wallet,
  },
  {
    type: 'currency',
    name: 'Total Profit',
    property: 'profitStats',
    propertyInWeek: 'profitStatsInWeek',
    icon: Banknote,
  },
];
