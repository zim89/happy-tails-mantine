export type ShippingMethodName = 'Standard' | 'Fast';

export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  price: number;
  daysOfDelivery: number;
}

export interface ShippingMethodsResponse {
  content: ShippingMethod[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
