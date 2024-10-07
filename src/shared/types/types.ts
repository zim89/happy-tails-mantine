export type ProductStatus = 'OUT OF STOCK' | 'IN STOCK';
type ProductType = 'INDOORS' | 'OUTDOORS';

type OrderStatus =
  | 'NEW'
  | 'IN PROGRESS'
  | 'PROCESSING'
  | 'CANCELLED'
  | 'SHIPPED'
  | 'RETURN PROCESSING'
  | 'COMPLETED';

export type ProductColor =
  | 'Black'
  | 'White'
  | 'Blue'
  | 'Pink'
  | 'Yellow'
  | 'Green'
  | 'Red'
  | 'Purple'
  | 'Orange'
  | 'Gray'
  | 'Brown'
  | 'ONE COLOR';

type ProductColorSizes = {
  color: Product['color'];
  productSizes: {
    size: ProductSizeValues;
    quantity: number;
    productStatus: ProductStatus;
    description: Product['description'];
  }[];
  imagePath: Product['imagePath'] | null;
}[];

export type CreateProductBody = {
  name: Product['name'];
  price: Product['price'];
  onSale: Product['onSale'];
  salePrice: Product['salePrice'];
  categoryId: Product['categoryId'];
  description: Product['description'];
  totalQuantity: Product['totalQuantity'];
  productColorSizes: ProductColorSizes;
  productType: Product['productType'];
  imagePath: Product['imagePath'];
};

export type ProductSizeValues =
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'XXL'
  | 'ONE SIZE'
  | 'ONE_SIZE';

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  zip: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: string;
};

type BillingAddress = ShippingAddress;

type ShippingMethod = {
  id: number;
  name: string;
  description: string;
  price: number;
  daysOfDelivery: number;
};

type Discount = {
  id: number;
  code: string;
  discount: number;
  minPrice: number;
  beginningDate: string;
  expirationDate: string;
};

export type ProductSize = {
  size: ProductSizeValues;
  quantity: number;
  productStatus: ProductStatus;
  description: string;
};

type RelatedProduct = {
  relatedProductId: number;
  relatedProductColorEnum: ProductColor;
  relatedProductImagePath: string;
};

export interface Product {
  id: number;
  article: string;
  name: string;
  price: number;
  color: ProductColor | null;
  onSale: boolean;
  salePrice: number | null;
  categoryId: number;
  categoryName: string;
  description: string;
  productType: ProductType;
  productStatus: ProductStatus;
  productSizes: ProductSize[] | null;
  relatedProducts: RelatedProduct[] | null;
  totalQuantity: number;
  unitsSold?: number;
  createdAt: number;
  updatedAt: number | null;
  imagePath: string;
}

export type CreateOrderBody = {
  cartProducts: {
    productId: number;
    sizeEnum: ProductSizeValues;
    count: number;
  }[];
  shippingAddress: Partial<ShippingAddress>;
  billingAddress: Partial<BillingAddress>;
  shippingMethodId: number;
  paymentMethod: string;
  email: string;
  agreementToTerms: boolean;
  emailMeWithOffersAndNews: boolean;
  discountCode?: string;
  commentOfManager?: string;
};

export interface Order {
  id: string;
  number: string;
  orderStatus: OrderStatus;
  createdDate: number;
  statusLastUpdatedAt: number | null;
  email: string;
  userId: string;
  orderProductDTOList: {
    orderNumber: string;
    productId: number;
    productName: string;
    productImagePath: string;
    productPrice: number;
    productSize: ProductSizeValues;
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
};

export type AxiosQueryError = {
  status?: number;
  data: ErrorData | string;
};

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

export type CustomComponentProps = {
  className?: string;
};
