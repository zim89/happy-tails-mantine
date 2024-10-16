import { Order } from '@/shared/types/types';

export const COLORS = {
  NEW: '#4285F4',
  'IN PROGRESS': '#FBBC04',
  COMPLETED: '#161616',
  CANCELLED: '#A52923',
};

export function summarizeOrderStatuses(orders: Order[]) {
  const statusCounts = orders.reduce<{ [P in string]: number }>(
    (acc, order) => {
      const status = order.orderStatus;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const result = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  return result;
}
