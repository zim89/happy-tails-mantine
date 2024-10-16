import { isNotEmpty, useForm } from '@mantine/form';

import { Product } from '@/shared/types/types';
import { createContext, useRef, useState } from 'react';
import { ContextType, PreviewImage, VariantForm } from '../utils';

export const context = createContext<ContextType>({} as ContextType);

type ProviderProps = {
  children: React.ReactNode;
};
export const AddProductProvider = ({ children }: ProviderProps) => {
  const [variants, setVariants] = useState<(VariantForm | null)[]>([]);
  const previewImage = useRef<PreviewImage>({ name: '', path: '' });

  const form = useForm({
    initialValues: {
      name: 'Test Product',
      categoryName: 'Test',
      price: 10,
      productType: 'INDOORS' as Product['productType'],
      description: 'Test Product',
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
