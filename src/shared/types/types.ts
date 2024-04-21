type ProductStatus = 'DELETE' | 'ACTIVE' | 'TEMPORARILY_ABSENT' | 'IN STOCK';
type ProductType = 'IN_STOCK' | 'OUT OF STOCK';

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
  unitsSold?: number;
  onSale?: boolean;
  salePrice?: number;
  productType?: ProductType; 
  updatedAt: number | null;
  createdAt: number;
}

export interface Order {
  billingAddress: string;
  createdDate: string;
  discountCode: string | null;
  email: string;
  id: string;
  number: string;
  orderProductDTOList: {
    id: number;
    orderNumber: string;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    onSale: boolean;
    salePrice: number;
    count: number;
  }[];
  orderStatus: string;
  paymentMethod: string;
  price: number;
  purchasedDate: string;
  shippingAddress: string;
  shippingMethod: string;
}

export type ParsedShippingAddress = {
  firstName: string;
  secondName: string;
  country: string;
  city: string;
  street: string;
  apartment: string;
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

export type ID = number | string; 

export type Sort = [string, 'asc' | 'desc'];