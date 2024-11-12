import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

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

export const filterByDate = (filter: string, date: Date | number) => {
  switch (filter) {
    case '2YPAST':
      return dayjs
        .unix(date)
        .isBetween(
          dayjs().subtract(2, 'year').startOf('year'),
          dayjs().subtract(2, 'year').endOf('year')
        );
    case 'YPAST':
      return dayjs
        .unix(date)
        .isBetween(
          dayjs().subtract(1, 'year').startOf('year'),
          dayjs().subtract(1, 'year').endOf('year')
        );
    case 'L6M':
      return dayjs.unix(date).isAfter(dayjs().subtract(6, 'month'));
    case 'L30D':
      return dayjs.unix(date).isAfter(dayjs().subtract(30, 'day'));
    default:
      return true;
  }
};
