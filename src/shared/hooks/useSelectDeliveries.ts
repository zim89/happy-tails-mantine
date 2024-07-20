import { useGetShippingMethodsQuery } from '../api/shippingMethodsApi';
import { ShippingMethod } from '../types/shippingMethod.types';

export const useSelectDeliveries = <T>(
  cb: (methods: ShippingMethod[]) => T
) => {
  const { methods } = useGetShippingMethodsQuery(undefined, {
    selectFromResult: (res) => ({ methods: cb(res.data?.content || []) }),
  });
  return methods;
};
