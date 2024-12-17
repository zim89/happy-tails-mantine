export type ResponseError = {
  timestamp: number;
  status: number;
  error: string;
  message: string;
  path: string;
};

export type DataError = {
  data: string | ResponseError;
  status: number;
};
