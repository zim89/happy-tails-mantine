import dayjs from 'dayjs';

export const getDeliveryDate = (
  daysOfDelivery: number,
  createdDate: string | number = '',
  hasOrder: boolean = false
) => {
  const dayjsDate = createdDate ? dayjs(createdDate) : dayjs();
  const result = dayjsDate.add(daysOfDelivery, 'day');

  return !hasOrder
    ? `by the ${result.format('D of MMMM')}`
    : result.format('D MMMM');
};
