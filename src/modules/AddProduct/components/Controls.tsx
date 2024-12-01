'use client';

import { UnstyledButton } from '@mantine/core';
import { useContext, useEffect } from 'react';

import {
  brandNotification,
  getImageSource,
  handleDispatchError,
  isAxiosQueryError,
} from '@/shared/lib/helpers';
import {
  AxiosQueryError,
  Category,
  CreateProductBody,
} from '@/shared/types/types';
import { ProductForm, context } from '../lib/utils';
import { useCreateMutation } from '@/shared/api/productApi';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { publishImage } from '@/shared/lib/requests';

import BlockLink from '@/modules/BlockLink';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';
import {
  CLIENT_ERROR,
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '@/shared/constants/httpCodes';

export const Controls = () => {
  const { productForm, previewImage, variants, setVariants } =
    useContext(context);
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);

  const [dispatch] = useCreateMutation();
  const categoryList = useSelectCategories((cats) => cats);

  // Handle leaving while there are unsaved changes
  useEffect(() => {
    const res = !!variants.length || productForm.isDirty();
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: res }));
  }, [productForm.values, variants.length]);

  const clearFile = () => {
    previewImage.current = {
      path: null,
      name: null,
    };
    productForm.setFieldValue('image', null);
  };

  const clearAndClose = () => {
    productForm.reset();
    productForm.setFieldValue('categoryName', 'None');
    setVariants([]);
    clearFile();
  };

  const createProductObject = (
    rest: any,
    productColorSizes: CreateProductBody['productColorSizes'],
    imagePath: string,
    totalQuantity: number,
    categoryName: string,
    categoryList: Category[]
  ) => {
    const newProduct: Partial<CreateProductBody> = {
      ...rest,
      productColorSizes,
      imagePath,
      totalQuantity,
      onSale: true,
      salePrice: 0,
    };

    const candidate = categoryList.find((cat) => cat.name === categoryName);
    if (candidate) {
      newProduct.categoryId = candidate.id;
    }

    return newProduct;
  };

  const processVariants = async (variants: any[], rest: any) => {
    let totalQuantity = 0;
    let productColorSizes: CreateProductBody['productColorSizes'] = [];

    for await (const variant of variants) {
      if (!variant) continue;

      totalQuantity += Number(variant.values.quantity);

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
        let variantImagePath = DEFAULT_CATEGORY_IMAGE;

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
    }

    return { totalQuantity, productColorSizes };
  };

  const processProductCreation = async (req: Partial<CreateProductBody>) => {
    const formCopy = {
      categoryName: productForm.values.categoryName,
      description: productForm.values.description,
      image: productForm.values.image,
      name: productForm.values.name,
      price: productForm.values.price,
      productStatus: productForm.values.productStatus,
      productType: productForm.values.productType,
    };

    const variantsCopy = variants.slice(0);

    console.log('Variants copy: ', variantsCopy);

    try {
      clearAndClose();
      productForm.resetDirty();
      brandNotification('SUCCESS', 'Product created successfully!');

      await dispatch({ req }).unwrap();
    } catch (err) {
      productForm.setValues(formCopy);
      setVariants(variantsCopy);
      throw err;
    }
  };

  const handleSubmit = async ({
    image,
    categoryName,
    ...rest
  }: ProductForm['values']) => {
    const { hasErrors } = productForm.validate();
    if (hasErrors) return;

    try {
      if (!variants.length)
        throw {
          data: 'Variants must be specified',
          status: CLIENT_ERROR,
        } as AxiosQueryError;

      const variantErrors = variants.some((variant) => {
        if (!variant) return;
        const { hasErrors } = variant.validate();
        return hasErrors;
      });

      if (variantErrors) return;

      const imagePath = await getImageSource(image, rest.name);

      const { totalQuantity, productColorSizes } = await processVariants(
        variants,
        rest
      );

      const newProduct = createProductObject(
        rest,
        productColorSizes,
        imagePath,
        totalQuantity,
        categoryName,
        categoryList
      );

      await processProductCreation(newProduct);
    } catch (err) {
      console.error(err);

      handleError(err);
    }
  };

  const handleError = (err: unknown) => {
    if (isAxiosQueryError(err)) {
      if (err.status === UNSUPPORTED_TYPE || err.status === TOO_LARGE_PAYLOAD) {
        productForm.setFieldValue('image', null);
        productForm.setFieldError('image', `${err.data}`);
      } else {
        handleDispatchError(err);
      }
    }
  };

  return (
    <div className='mt-12 flex gap-[42px]' data-testid='controls'>
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
        data-testid='save-button'
      >
        Save
      </UnstyledButton>
    </div>
  );
};
