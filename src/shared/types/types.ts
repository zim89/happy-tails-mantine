type ProductStatus = 'OUT OF STOCK' | 'IN STOCK';
type ProductType = 'INDOORS' | 'OUTDOORS';

type OrderStatus =
  | 'NEW'
  | 'IN_PROGRESS'
  | 'PROCESSING'
  | 'CANCELLED'
  | 'SHIPPED'
  | 'RETURN_PROCESSING'
  | 'COMPLETED';

export enum ProductColor {
  Black = "Black",
  White = "White",
  Blue = "Blue",
  Pink = "Pink",
  Yellow = "Yellow",
  Green = "Green",
  Red = "Red",
  Purple = "Purple",
  Orange = "Orange",
  Gray = "Gray",
  Brown = "Brown",
  "ONE COLOR" = "ONE COLOR"
}

export enum ProductSizeEnum {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  "ONE SIZE" = "ONE SIZE"
}

type ShippingAddress = {
  company: string;
  country: string;
  zip: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: string;
}

type BillingAddress = ShippingAddress;

type ShippingMethod = {
  id: number;
  name: string;
  description: string;
  price: number;
  daysOfDelivery: number;
}

type Discount = {
  id: number;
  code: string;
  discount: number;
  minPrice: number;
  beginningDate: string;
  expirationDate: string;
}

type ProductSize = {
  size: ProductSizeEnum;
  quantity: number;
  productStatus: ProductStatus;
}

type RelatedProduct = {
  relatedProductId: number;
  relatedProductColorEnum: ProductColor;
  relatedProductImagePath: string;
}

export interface Product {
  id: number;
  article: string;
  name: string;
  price: number;
  color: ProductColor;
  onSale?: boolean;
  salePrice: number | null;
  categoryId: number;
  categoryName: string;
  description: string;
  productType?: ProductType;
  productSizes: ProductSize[] | null;
  relatedProducts: RelatedProduct[] | null;
  totalQuantity: number;
  unitsSold?: number;
  createdAt: number;
  updatedAt: number | null;
  imagePath: string;
}

export interface Order {
  id: string;
  number: string;
  orderStatus: OrderStatus;
  createdDate: string;
  statusLastUpdatedAt: number | null;
  email: string;
  userId: string;
  orderProductDTOList: {
    orderNumber: string;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    productSize: ProductSizeEnum;
    productColor: ProductColor;
    productArticle: string;
    onSale: boolean;
    salePrice: number;
    count: number;
  }[];
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: string;
  shippingMethodDTO: ShippingMethod;
  eta: string;
  priceOfProducts: number;
  taxAmount: number;
  discountAmount: number;
  discountDTO: Discount;
  totalPrice: number;
  agreementToTerms: boolean;
  emailMeWithOffersAndNews: boolean;
  commentOfManager: string;
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
