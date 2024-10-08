import { UseFormReturnType, isNotEmpty, useForm } from '@mantine/form';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AxiosQueryError, Product, ProductSize } from '@/shared/types/types';

import { ProductPutRequest, useUpdateMutation } from '@/shared/api/productApi';
import { publishImage } from '@/shared/lib/requests';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { CLIENT_ERROR } from '@/shared/constants/httpCodes';

export type SizeForm = UseFormReturnType<
  Omit<ProductSize, 'productStatus'>,
  (
    values: Omit<ProductSize, 'productStatus'>
  ) => Omit<ProductSize, 'productStatus'>
> & { id: 'form' };

export type InitSizeValues = {
  id: 'init';
} & Omit<ProductSize, 'productStatus'>;

export type ProductForm = UseFormReturnType<
  {
    name: Product['name'];
    categoryName: Product['categoryName'];
    color: Product['color'];
    price: Product['price'];
    productType: Product['productType'];

    description: Product['description'];
    image: File | null;
  },
  (values: {
    name: Product['name'];
    categoryName: Product['categoryName'];
    color: Product['color'];
    price: Product['price'];
    productType: Product['productType'];

    description: Product['description'];
    image: File | null;
  }) => {
    name: Product['name'];
    categoryName: Product['categoryName'];
    color: Product['color'];
    price: Product['price'];
    productType: Product['productType'];

    description: Product['description'];
    image: File | null;
  }
>;

type PreviewImage = {
  name: string | null;
  path: string | null;
};

export type ContextType = {
  productForm: ProductForm;
  previewImage: MutableRefObject<PreviewImage>;
  sizes: (SizeForm | InitSizeValues)[];
  setSizes: Dispatch<SetStateAction<(SizeForm | InitSizeValues)[]>>;
  isDirty: boolean;
  handleSubmit: () => Promise<ProductPutRequest>;
};

export const context = createContext<ContextType>({} as ContextType);

type ProviderProps = {
  children: React.ReactNode;
  product: Product;
};

export const UpdateProductProvider = ({ children, product }: ProviderProps) => {
  const categories = useSelectCategories((state) => state);
  const [dispatch] = useUpdateMutation();

  const [sizes, setSizes] = useState<ContextType['sizes']>(
    product.productSizes
      ? product.productSizes.map((s) => ({
          id: 'init',
          ...s,
        }))
      : []
  );

  const previewImage = useRef<PreviewImage>({
    name: product.name,
    path: product.imagePath,
  });

  const form = useForm({
    initialValues: {
      name: product.name,
      categoryName: product.categoryName,
      price: product.price,
      color: product.color,
      productType: product.productType,
      description: product.description,
      image: { type: 'Empty' } as File | null,
    },

    onValuesChange(values) {
      if (
        values.image &&
        values.image.type !== 'Empty' &&
        previewImage.current
      ) {
        previewImage.current.path = URL.createObjectURL(values.image);
        previewImage.current.name = values.image.name;
      }
    },

    validate: {
      name: isNotEmpty('Entered an invalid product name'),
      productType: isNotEmpty('Pick a product type'),
      categoryName: isNotEmpty('Pick a category for the product'),
      price: (val) => (val < 1 ? 'Entered an invalid price' : null),
      image: isNotEmpty('Please select a product image'),
      description: isNotEmpty('Enter a description'),
    },
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // If product form is not touched
    // and sizes' forms aren't touched
    // and sizes number equals initial product sizes' length,
    // then it's not touched
    setIsDirty(
      !form.isDirty() &&
        sizes.every((s) => s.id === 'form' && !s.isDirty()) &&
        sizes.length === Number(product.productSizes?.length || 0)
        ? false
        : true
    );
  }, [form.isDirty(), sizes]);

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    const sizesHasErrors = sizes.some(
      (s) => s.id === 'form' && s.validate().hasErrors
    );

    // It's not possible to initialize image field from string, cause it has different type (File),
    // so it checks previewImage for availability of image
    if (hasErrors || sizesHasErrors || !previewImage.current.path) {
      const error: AxiosQueryError = {
        data: "Fields haven't filled correctly!",
        status: CLIENT_ERROR,
      };

      throw error;
    }

    const {
      categoryName: categoryNameField,
      image: imageField,
      ...fieldSelection
    } = form.values;
    const {
      categoryName,
      createdAt,
      relatedProducts,
      unitsSold,
      updatedAt,
      totalQuantity,
      productSizes,
      productStatus,
      imagePath,
      categoryId,
      ...productSelection
    } = product;

    let productImage = imagePath;
    let categoryProductId = categoryId;

    const totalProductQuantity = sizes.reduce((acc, curr) => {
      if (curr.id !== 'form') return acc;

      return acc + Number(curr.values.quantity);
    }, 0);

    const productSizesArray =
      sizes.length > 0
        ? sizes.map<ProductSize>((s) => {
            if (s.id === 'form') {
              return {
                description: s.values.description,
                productStatus:
                  s.values.quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK',
                quantity: s.values.quantity,
                size: s.values.size,
              };
            } else {
              return {
                description: s.description || '',
                productStatus: s.quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK',
                quantity: s.quantity,
                size: s.size,
              };
            }
          })
        : null;

    if (categoryNameField !== categoryName) {
      const candidate = categories.find(
        (cat) => cat.name === categoryNameField
      );
      candidate && (categoryProductId = candidate.id);
    }

    if (imageField && imageField.type !== 'Empty') {
      // Upload the image to the server and get the public URL
      productImage = await publishImage(imageField, form.values.name);
    }

    const requestBody: ProductPutRequest = {
      ...productSelection,
      ...fieldSelection,
      productSizes: productSizesArray,
      categoryId: categoryProductId,
      imagePath: productImage,
      totalQuantity: totalProductQuantity,
      productStatus: totalProductQuantity > 0 ? 'IN STOCK' : 'OUT OF STOCK',
    };

    const res = await dispatch({ req: requestBody }).unwrap();
    return res;
  };

  return (
    <context.Provider
      value={{
        isDirty: isDirty,
        productForm: form,
        previewImage,
        sizes,
        setSizes,
        handleSubmit,
      }}
    >
      {children}
    </context.Provider>
  );
};
