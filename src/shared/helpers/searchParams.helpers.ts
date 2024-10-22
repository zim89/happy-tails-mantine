import { ReadonlyURLSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useSearchString = (searchParams: ReadonlyURLSearchParams) => {
  const createQueryString = useCallback(
    (values: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) =>
        value ? params.set(key, value) : params.delete(key)
      );

      return params.toString();
    },
    [searchParams]
  );

  return [createQueryString];
};

export const removeSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  paramsToDelete: string[]
) => {
  const params = new URLSearchParams(searchParams.toString());
  paramsToDelete.forEach((paramToDelete) => params.delete(paramToDelete));

  return params;
};
