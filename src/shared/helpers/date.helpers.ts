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

export const mapFilterToDate = (filter: string) => {
  switch (filter) {
    case '2YPAST':
      return dayjs().subtract(2, 'years').unix();
    case 'YPAST':
      return dayjs().subtract(1, 'year').unix();
    case 'L6M':
      return dayjs().subtract(6, 'months').unix();
    case 'L30D':
      return dayjs().subtract(30, 'days').unix();
    default:
      return dayjs(filter).unix();
  }
};
