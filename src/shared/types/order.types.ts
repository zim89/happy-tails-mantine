export interface Order {
  id: number;
  number: string;
  orderStatus: string;
  createdDate: string;
  statusLastUpdatedAt: string;
  email: string;
  userId: string;
  orderProductDTOList: [
    {
      orderNumber: string;
      productId: number;
      productName: string;
      productPrice: number;
      productImagePath: string;
      productSize: string;
      productArticle: string;
      onSale: boolean;
      salePrice: number;
      count: number;
    },
  ];
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  shippingMethodDTO: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  priceOfProducts: number;
  taxAmount: number;
  discountAmount: number;
  discountDTO: {
    id: number;
    code: string;
    discount: number;
    minPrice: number;
    beginningDate: string;
    expirationDate: string;
  };
  totalPrice: number;
  agreementToTerms: boolean;
  emailMeWithOffersAndNews: boolean;
  commentOfManager: string;
}

export interface GetOrderPayload {
  email: string;
  code: string;
}
