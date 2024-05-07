type ProductStatus = 'DELETE' | 'ACTIVE' | 'TEMPORARILY_ABSENT' | 'IN STOCK';
type ProductType = 'INDOORS' | 'OUTDOORS';

type OrderStatus =
  | 'NEW'
  | 'IN_PROGRESS'
  | 'PROCESSING'
  | 'CANCELLED'
  | 'SHIPPED'
  | 'RETURN_PROCESSING'
  | 'COMPLETED';

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
  salePrice: number | null;
  productType?: ProductType;
  updatedAt: number | null;
  createdAt: number;
}

export interface Order {
  billingAddress: string;
  createdDate: string;
  statusLastUpdatedAt: number | null;
  commentOfManager: string | null;
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
  orderStatus: OrderStatus;
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
};

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

export type ErrorData = {
  status: number;
  error: string;
  path: string;
  timestamp: number;
  message: string;
}

export type AxiosQueryError = {
  status?: number;
  data: ErrorData | string;
}

export type ID = number | string;

export type Category = {
  id: number;
  name: string;
  title: string;
  description: string;
  overview: string;
  path: string;
  productCount: number;
  imgSrc: null | string;
  updatedAt: number | null;
  createdAt: number;
  coordinateOnBannerX: number;
  coordinateOnBannerY: number;
};

export type Sort = [string, 'asc' | 'desc'];
