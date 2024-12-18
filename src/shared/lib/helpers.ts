import dayjs from 'dayjs';

import {
  Order,
  AxiosQueryError,
  ProductStatus,
  ProductColor,
  ProductSizeValues,
} from '../types/types';
import { DEFAULT_CATEGORY_IMAGE, ErrorResponse } from './constants';
import { UNSUPPORTED_TYPE, TOO_LARGE_PAYLOAD } from '../constants/httpCodes';
import { MAX_FILE_SIZE } from '../constants/sizes.const';
import { ToastOptions, toast } from 'react-toastify';
import { publishImage } from './requests';

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
            error: 'Expected Error',
            message: 'The error is emitted successfully!',
          })
        );
      }
    }, 10000);
  });

export const wait = (value = 5000) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, value);
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

export const formatColor = (color: ProductColor) => {
  if (color === 'ONE COLOR') return color.toLowerCase();
  else return color;
};

export const formatSize = (size: ProductSizeValues) => {
  if (size === 'ONE_SIZE') return size.replace('_', ' ').toLowerCase();
  else return size;
};

export const isFile = (param: unknown): param is File => {
  return param instanceof File;
};

export const isBlob = (param: unknown): param is Blob => {
  return param instanceof Blob;
};

export const validateFile = (image: Blob | File | string) => {
  let error: AxiosQueryError | null = null;

  const regex = /\.(png|jpe?g|gif|webp)$/i;
  let match = null;

  isBlob(image) && (match = image.type.match(regex));
  isFile(image) && (match = image.name.match(regex));
  typeof image === 'string' && (match = image.match(regex));

  if (!match) {
    error = {
      data: 'Forbidden image type. Available image types are: gif, webp, png and jpeg',
      status: UNSUPPORTED_TYPE,
    } as AxiosQueryError;
  }

  if ((isBlob(image) || isFile(image)) && image.size > MAX_FILE_SIZE) {
    error = {
      data: 'The file you uploaded exceeds the size limit, please compress or choose a smaller file',
      status: TOO_LARGE_PAYLOAD,
    } as AxiosQueryError;
  }

  return error;
};

export const brandNotification = (
  op: 'SUCCESS' | 'ERROR',
  message: string,
  opts?: ToastOptions
) => {
  const toastOpts: ToastOptions = {
    position: 'bottom-left',
    autoClose: 7000,
    ...opts,
  };

  return op === 'SUCCESS'
    ? toast.success(message, toastOpts)
    : toast.error(message, toastOpts);
};

export const getImageSource = async (
  image: any,
  description: string,
  fallbackUrl = DEFAULT_CATEGORY_IMAGE
): Promise<string> => {
  if (image) {
    return await publishImage(image, description, fallbackUrl);
  }
  return fallbackUrl;
};

export const handleDispatchError = (err: any, opts?: ToastOptions) => {
  if (isAxiosQueryError(err)) {
    brandNotification(
      'ERROR',
      isErrorDataString(err.data) ? err.data : err.data.message,
      opts
    );
  }
};
