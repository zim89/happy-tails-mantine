import dayjs from 'dayjs';

import { Order, AxiosQueryError, ProductStatus } from '../types/types';
import { ErrorResponse } from './constants';

export const formatDateToClockTime = (date: string | number) => {
  return dayjs(date).format('HH:mm');
};

export const formatDate = (
  date: string | number,
  format = 'MMMM D, YYYY',
  unix?: boolean
) => {
  if (unix && typeof date === 'number') return dayjs.unix(date).format(format);
  return dayjs(date).format(format);
};

export const formatDateToLongString = (
  date: string | number,
  format = 'MMMM D, YYYY'
) => {
  if (typeof date === 'number') return dayjs.unix(date).format(format);
  return dayjs(date).format(format);
};

export const formatDateToShortString = (raw: string | number) => {
  return dayjs(raw).format('DD.MM.YY');
};

export const formatDateToISO = (raw: string) => {
  return dayjs(raw).format();
};

export const formatUserAttributes = (obj: { [P in string]: string }) => {
  let res: { [P in string]: [string] } = {};

  Object.entries(obj).forEach(([key, val]) => {
    res[key] = [val];
  });

  return res;
};

export const formatDateTimeWithBrackets = (raw: string | number) => {
  return dayjs(raw).format('MMM DD, YYYY (HH:mm)');
};

export const formatDateWithoutTime = (raw: string | number) => {
  return dayjs(raw).format('MMM DD, YYYY');
};

export const formatDateFromArray = (
  array: number[],
  format = 'MMM DD, YYYY (HH:mm)'
) => {
  const dateArray = array;
  const date = dayjs(
    new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4],
      dateArray[5],
      dateArray[6] / 1000
    )
  );
  const formattedDate = date.format(format);

  return formattedDate;
};

export const formatDateFromTimestamp = (date: number) => {
  return dayjs(new Date(date)).format('MMMM D, YYYY');
};

export const formatDateFromUnix = (date: number) => {
  return dayjs.unix(date).format('MMMM D, YYYY');
};

export const formatYearFromDate = (date: number) => {
  return dayjs(new Date(date)).format('YYYY');
};

export const formatShortDateFromUnix = (date: number) => {
  return dayjs(date).format('DD MMM, YYYY');
};

export const formatDateToDashedOne = (date: number) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const cleanPostcode = (input: string): string => {
  // This regex matches the postcode pattern and captures the postcode part before the space and parenthesis
  const regex = /^([A-Za-z0-9]+) \(.+\)$/;

  // Replace the matched group with just the postcode part
  const cleanedInput = input.replace(regex, '$1');

  return cleanedInput;
};

// I wrote my own implementation of isDirty, cause the embedded one doesn't take into account white spaces
export const dirtyFields = (obj: { [P in string]: string }) => {
  let res: [{ [P in string]: string }, number] = [{}, 0];

  Object.entries(obj).forEach(([key, val]) => {
    const candidate = val.trim();

    if (candidate.length > 0) {
      res[0][key] = val;
      res[1]++;
    }
  });

  return res;
};

export const availabilityMap: {
  [P in NonNullable<ProductStatus>]: string;
} = {
  'IN STOCK': 'https://schema.org/InStock',
  'OUT OF STOCK':
    'https://schema.org/OutOfStock: The item is currently out of stock.',

  // https://schema.org/BackOrder: The item is on back order.
  // https://schema.org/Discontinued: The item has been discontinued.
  // https://schema.org/InStock: The item is in stock.
  // https://schema.org/InStoreOnly: The item is only available for purchase in store.
  // https://schema.org/LimitedAvailability: The item has limited availability.
  // https://schema.org/OnlineOnly: The item is available online only.
  // https://schema.org/PreOrder: The item is available for pre-order.
  // https://schema.org/PreSale: The item is available for ordering and delivery before general availability.
  // https://schema.org/SoldOut: The item has been sold out.
};

export const calculateOrders = (orders: Order[]) => {
  let kinds: { [P in Order['orderStatus']]: number } = {
    CANCELLED: 0,
    COMPLETED: 0,
    'IN PROGRESS': 0,
    NEW: 0,
    PROCESSING: 0,
    'RETURN PROCESSING': 0,
    SHIPPED: 0,
  };

  orders.forEach((order) => {
    kinds[order.orderStatus] = kinds[order.orderStatus] + 1;
  });

  return kinds;
};

export const mockLongRequest = (value?: boolean) =>
  new Promise<void>((resolve, reject) => {
    let success;

    setTimeout(() => {
      success = value != null ? value : Math.random() < 0.5 ? true : false;

      if (success) {
        resolve();
      } else {
        reject(
          new ErrorResponse({
            path: '/',
            timestamp: Date.now(),
            status: 418,
            error: 'Exprected Error',
            message: 'The error is emitted successfully!',
          })
        );
      }
    }, 5000);
  });

export function isAxiosQueryError(error: any): error is AxiosQueryError {
  return typeof error === 'object' && 'data' in error;
}

export const isErrorDataString = (
  payload: AxiosQueryError['data']
): payload is string => {
  return typeof payload === 'string';
};

export const convertBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

export const convertMeasurement = (value: number) => {
  const stringifiedValue = value.toString();

  if (value < 1000) return stringifiedValue;
  else if (value < 1000000)
    return stringifiedValue.slice(0, stringifiedValue.length - 3) + 'K';
  else if (value < 1000000000)
    return stringifiedValue.slice(0, stringifiedValue.length - 6) + 'M';
  else return stringifiedValue.slice(0, stringifiedValue.length - 9) + 'B';
};

export const getCurrentMonth = () => {
  return dayjs(Date.now()).format('MMMM');
};
