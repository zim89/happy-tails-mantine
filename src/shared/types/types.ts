type ProductStatus = 'DELETE' | 'ACTIVE' | 'TEMPORARILY_ABSENT';

export interface Product {
  id: number;
  article: string;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
  description: string;
  quantity: number;
  productStatus: ProductStatus;
  imagePath: string;
}

export type BackendSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type BackendPageable = {
  offset: number;
  sort: BackendSort;
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
};

export type BackendResponse<T> = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T;
  number: number;
  sort: BackendSort;
  numberOfElements: number;
  pageable: BackendPageable;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type Sort = [string, 'asc' | 'desc'];
