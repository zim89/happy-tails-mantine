import { DataError, ResponseError } from '../types/error.types';
import { isAxiosError } from 'axios';

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const isDataError = (error: unknown): error is DataError => {
  return error !== null && typeof error === 'object' && 'data' in error;
};

export const isResponseError = (error: unknown): error is ResponseError => {
  return error !== null && typeof error === 'object' && 'message' in error;
};

export const isClientError = (error: ResponseError | DataError) => {
  return 'status' in error && error.status >= 400 && error.status < 500;
};

const GENERAL_ERROR_TEXT = 'Something went wrong. Please try again later.';

export const handleError = (error: unknown, cb?: (message: string) => void) => {
  if (!cb) {
    console.error(error);
    return;
  }

  const err = isAxiosError(error) ? error.response?.data : error;

  if (isResponseError(err)) {
    if (isClientError(err)) {
      cb(err.message);
    } else {
      cb(GENERAL_ERROR_TEXT);
    }

    console.error(err);
    return;
  }

  if (isDataError(err)) {
    const message = typeof err.data === 'string' ? err.data : err.data.message;

    if (isClientError(err)) {
      cb(message);
    } else {
      cb(GENERAL_ERROR_TEXT);
    }

    console.error(err);
    return;
  }

  cb(GENERAL_ERROR_TEXT);
  console.error(err);
};
