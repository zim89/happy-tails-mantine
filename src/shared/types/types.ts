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
