import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { Product, ProductSizeEnum } from '@/shared/types/types';
import { UnstyledButton } from '@mantine/core';
import axios from 'axios';
import { ProductForm, context } from '../lib/utils';
import { useContext } from 'react';
import { useCreateMutation } from '@/shared/api/productApi';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';

type Props = {
  setNotification: (
    type: 'Success' | 'Failed',
    text?: string | undefined
  ) => void;
};

export const Controls = ({ setNotification }: Props) => {
  const { productForm, previewImage, variants } = useContext(context);
  const [dispatch] = useCreateMutation();
  const categoryList = useSelectCategories((cats) => cats);

  const clearFile = () => {
    previewImage.current = {
      path: null,
      name: null,
    };
    productForm.setFieldValue('image', null);
  };

  const clearAndClose = () => {
    productForm.reset();
    clearFile();
  };

  const handleSubmit = async ({ image, ...rest }: ProductForm['values']) => {
    try {
      let imagePath = DEFAULT_CATEGORY_IMAGE;

      if (image) {
        const form = new FormData();
        form.append('image', image);
        form.append('title', `PRODUCT: ${name}`);

        const res = await axios.post('https://api.imgur.com/3/image/', form, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        imagePath = res.data.data.link;
      }

      const newProduct: Partial<Product> = {
        ...rest,
        productSizes: [
          {
            size: ProductSizeEnum['M'],
            quantity: 1,
            productStatus: 'IN STOCK',
            description: null,
          },
        ],
        imagePath,
      };

      const candidate = categoryList.find(
        (cat) => cat.name === newProduct.categoryName
      );
      candidate && (newProduct.categoryId = candidate.id);

      await dispatch({ req: newProduct }).unwrap();

      clearAndClose();
      setNotification('Success');
    } catch (err) {
      clearAndClose();
      console.error(err);

      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
    }
  };

  return (
    <div className='mt-12 flex gap-[42px]'>
      <UnstyledButton
        classNames={{ root: 'rounded-sm font-bold px-12 py-[10px] bg-white' }}
        styles={{ root: { border: '1px solid #C8C8C8' } }}
      >
        Cancel
      </UnstyledButton>
      <UnstyledButton
        classNames={{
          root: 'bg-black text-white py-[10px] px-[55px] font-bold rounded-sm',
        }}
        onClick={() => console.log(productForm.values, variants)}
      >
        Save
      </UnstyledButton>
    </div>
  );
};
