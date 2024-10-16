import { UseFormReturnType, isNotEmpty, useForm } from '@mantine/form';

import { Product, ProductColor, ProductSizeValues } from '@/shared/types/types';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react';

export type VariantForm = UseFormReturnType<
  {
    size: ProductSizeValues;
    color: ProductColor;
    quantity: number;
    price: number;
    variantImage: File | null;
  },
  (values: {
    size: ProductSizeValues;
    color: ProductColor;
    quantity: number;
    price: number;
    variantImage: File | null;
  }) => {
    size: ProductSizeValues;
    color: ProductColor;
    quantity: number;
    price: number;
    variantImage: File | null;
  }
>;

export type ProductForm = UseFormReturnType<
  {
    name: string;
    categoryName: string;
    productStatus: Product['productStatus'];
    price: number;
    productType: Product['productType'];
    description: string;
    image: File | null;
  },
  (values: {
    name: string;
    categoryName: string;
    productStatus: Product['productStatus'];
    price: number;
    productType: Product['productType'];
    description: string;
    image: File | null;
  }) => {
    name: string;
    categoryName: string;
    productStatus: Product['productStatus'];
    price: number;
    productType: Product['productType'];
    description: string;
    image: File | null;
  }
>;

export type PreviewImage = {
  name: string | null;
  path: string | null;
};

export type ContextType = {
  productForm: ProductForm;
  variants: (VariantForm | null)[];
  setVariants: Dispatch<SetStateAction<(VariantForm | null)[]>>;
  previewImage: MutableRefObject<PreviewImage>;
};

export const context = createContext<ContextType>({} as ContextType);

export type ProviderProps = {
  children: React.ReactNode;
};
export const AddProductProvider = ({ children }: ProviderProps) => {
  const [variants, setVariants] = useState<(VariantForm | null)[]>([]);
  const previewImage = useRef<PreviewImage>({ name: '', path: '' });

  const form = useForm({
    initialValues: {
      name: '',
      categoryName: '' as Product['categoryName'],
      price: 0,
      productType: 'INDOORS' as Product['productType'],
      description: '',
      productStatus: 'IN STOCK' as Product['productStatus'],
      image: null as File | null,
    },

    onValuesChange(values) {
      if (values.image && previewImage.current) {
        previewImage.current.path = URL.createObjectURL(values.image);
        previewImage.current.name = values.image.name;
      }
    },

    validate: {
      name: isNotEmpty('Entered an invalid product name'),
      categoryName: isNotEmpty('Pick a category for the product'),
      price: (val) => (val < 1 ? 'Entered an invalid price' : null),
      image: isNotEmpty('Please select a product image'),
      description: isNotEmpty('Enter a description'),
      productStatus: isNotEmpty('Enter a product status'),
      productType: isNotEmpty('Enter a product type'),
    },
  });

  return (
    <context.Provider
      value={{
        productForm: form,
        variants,
        setVariants,
        previewImage,
      }}
    >
      {children}
    </context.Provider>
  );
};
