import { UnstyledButton } from '@mantine/core';
import { useContext, useEffect } from 'react';

import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { CreateProductBody } from '@/shared/types/types';
import { ProductForm, context } from '../lib/utils';
import { useCreateMutation } from '@/shared/api/productApi';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { publishImage } from '@/shared/lib/requests';

import BlockLink from '@/modules/BlockLink';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';

type Props = {
  setNotification: (
    type: 'Success' | 'Failed',
    text?: string | undefined
  ) => void;
};

export const Controls = ({ setNotification }: Props) => {
  const { productForm, previewImage, variants } = useContext(context);
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);

  const [dispatch] = useCreateMutation();
  const categoryList = useSelectCategories((cats) => cats);

  // Handle leaving while there are unsaved changes
  useEffect(() => {
    const res = !!variants.length || productForm.isDirty();
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: res }));
  }, [productForm.values, variants]);

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

  const handleSubmit = async ({
    image,
    categoryName,
    quantity,
    ...rest
  }: ProductForm['values']) => {
    const { hasErrors } = productForm.validate();
    if (hasErrors) return;

    const variantErrors = variants.some((variant) => {
      if (!variant) return;
      const { hasErrors } = variant.validate();
      return hasErrors;
    });

    if (variantErrors) return;

    try {
      let imagePath = '';

      if (image) {
        imagePath = await publishImage(image, rest.name);
      }

      let totalQuantity = Number(quantity);

      let productColorSizes: CreateProductBody['productColorSizes'] = [];
      if (variants.length) {
        variants.forEach(async (variant) => {
          if (!variant) return;

          // Update total quantity of the product
          totalQuantity += Number(variant.values.quantity);

          // Add size for each color
          let candidateIndex = productColorSizes.findIndex(
            (v) => v.color === variant.values.color
          );

          if (candidateIndex !== -1) {
            productColorSizes[candidateIndex].productSizes.push({
              size: variant.values.size,
              productStatus:
                variant.values.quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK',
              quantity: variant.values.quantity,
              description: `${rest.description} (${variant.values.color})`,
            });
          } else {
            let variantImagePath = '';

            if (variant.values.variantImage) {
              variantImagePath = await publishImage(
                variant.values.variantImage,
                `${rest.name} in ${variant.values.color}`
              );
            }

            productColorSizes.push({
              color: variant.values.color,
              imagePath: variantImagePath,
              productSizes: [
                {
                  size: variant.values.size,
                  quantity: variant.values.quantity,
                  productStatus:
                    variant.values.quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK',
                  description: `${rest.description} (${variant.values.color})`,
                },
              ],
            });
          }
        });
      }

      const newProduct: Partial<CreateProductBody> = {
        ...rest,
        productColorSizes: productColorSizes,
        imagePath,
        totalQuantity,
        onSale: true,
        salePrice: 0,
      };

      const candidate = categoryList.find((cat) => cat.name === categoryName);

      candidate && (newProduct.categoryId = candidate.id);

      console.log(newProduct);

      await dispatch({ req: newProduct }).unwrap();

      clearAndClose();
      setNotification('Success', 'Product created successfully!');
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
        <BlockLink href='/admin/products'>Cancel</BlockLink>
      </UnstyledButton>
      <UnstyledButton
        classNames={{
          root: 'bg-black text-white py-[10px] px-[55px] font-bold rounded-sm',
        }}
        onClick={() => handleSubmit(productForm.values)}
      >
        Save
      </UnstyledButton>
    </div>
  );
};
