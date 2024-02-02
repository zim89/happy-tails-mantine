import dayjs from 'dayjs';

export const formatDate = (date: number) => {
  return dayjs.unix(date).format('MMMM D, YYYY');
};
