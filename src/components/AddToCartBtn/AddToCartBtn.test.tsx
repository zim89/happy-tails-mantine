import { describe, test } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import AddButton, { Props } from './';
import { Product } from '@/shared/types/types';
import * as mod from '@/shared/redux/cart/cartSlice';

const TestAddButton = (props: Props) => {
  return (
    <TestWrapper>
      <AddButton {...props} />
    </TestWrapper>
  );
};

let product: Product = {
  id: 57,
  article: 'ABK4574',
  name: 'FouFouDog Bodyguard Dog Pants',
  price: 52.97,
  color: 'ONE COLOR',
  onSale: false,
  salePrice: null,
  categoryId: 4,
  categoryName: 'Clothing',
  description:
    'Rain + Mud = One Dirty Dog. We have the solution to a muddy undercarriage and muddy legs after one of those rainy walks. The Bodyguard covers the essentials, and easily fastens with adjustable buckles',
  productType: 'OUTDOORS',
  productSizes: [
    {
      size: 'ONE SIZE',
      quantity: 122,
      productStatus: 'IN STOCK',
      description: '',
    },
  ],
  relatedProducts: null,
  totalQuantity: 122,
  unitsSold: 1,
  productStatus: 'IN STOCK',
  createdAt: 1721738011.36281,
  updatedAt: null,
  imagePath:
    'https://www.petland.ca/cdn/shop/files/foufoubrands-foufoudog-bodyguard-dog-pants-29237384839270_376x489.png?v=1691462338',
};

describe('AddButton', () => {
  test('should render', () => {
    const { getByRole } = render(<TestAddButton count={0} product={product} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('should render a button which indicates that the product has been sold', () => {
    const productCopy = Object.create(product);
    productCopy.productStatus = 'OUT OF STOCK';

    const { queryByText } = render(
      <TestAddButton count={0} product={productCopy} />
    );
    expect(queryByText('Out of stock')).toBeDefined();
  });

  test('should render a button which adds the product to the cart', () => {
    const productCopy = Object.create(product);
    productCopy.productStatus = 'IN STOCK';

    const { getByRole } = render(
      <TestAddButton count={0} product={productCopy} />
    );
    const button = getByRole('button');

    expect(button).toHaveTextContent('Add to cart');
  });

  test('should open the cart when the user clicks', () => {
    const openCartDrawer = vi.spyOn(mod, 'openCartDrawer');

    const { getByRole } = render(<TestAddButton count={1} product={product} />);
    const button = getByRole('button');
    fireEvent.click(button);

    expect(openCartDrawer).toHaveBeenCalled();
  });

  test('should pass in correct params to click handler', () => {
    const addToCart = vi.spyOn(mod, 'addToCart');

    const testCount = 6;

    const productCopy = Object.create(product);
    productCopy.productStatus = 'IN STOCK';

    const { getByRole } = render(
      <TestAddButton count={testCount} product={productCopy} size='XL' />
    );
    const button = getByRole('button');
    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledWith({
      ...productCopy,
      count: testCount,
      size: 'XL',
    });
  });
});
