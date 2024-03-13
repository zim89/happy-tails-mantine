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
  number: string;
  orderStatus: string;
  createdDate: string;
  price: number;
  count: number;
  userId: string;
  orderProductDTOList: {
    id: number;
    orderNumber: string;
    productId: number;
    productName: string;
    productPrice: number;
    onSale: boolean;
    salePrice: number;
    count: number;
  }[];
  purchasedDate: string;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  discountCode: string;
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
