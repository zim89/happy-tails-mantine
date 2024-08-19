import { describe, test } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import AddToWishBtn, { Props } from './';
import { Product } from '@/shared/types/types';
import * as store from '@/shared/redux/favorites/favoritesSlice';

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

const TestAddToWishBtn = (props: Props) => {
  return (
    <TestWrapper>
      <AddToWishBtn {...props} />
    </TestWrapper>
  );
};

describe('AddToWishBtn', () => {
  test('should render the button without text', () => {
    const { getByTestId, queryByTestId } = render(
      <TestAddToWishBtn product={product} />
    );

    expect(getByTestId('btn-without-text')).toBeInTheDocument();
    expect(queryByTestId('btn-with-text')).toBeNull();
  });

  test('should render the button with text', () => {
    const { getByTestId, queryByTestId } = render(
      <TestAddToWishBtn product={product} withText />
    );

    const buttonWithText = getByTestId('btn-with-text');

    expect(buttonWithText).toBeInTheDocument();
    expect(buttonWithText).toHaveTextContent('Add to Wishlist');
    expect(queryByTestId('btn-without-text')).toBeNull();
  });

  test('should render the button which detaches a product from the wishlist', () => {
    vi.spyOn(store, 'selectFavorites').mockImplementation(() => [product]);

    const { getByTestId, queryByTestId } = render(
      <TestAddToWishBtn product={product} withText />
    );

    const buttonWithText = getByTestId('btn-with-text');

    expect(buttonWithText).toBeInTheDocument();
    expect(buttonWithText).toHaveTextContent('Remove from Wishlist');
    expect(queryByTestId('btn-without-text')).toBeNull();
  });

  test('should call the detach method when the product is in the wishlist', () => {
    const detachItem = vi.spyOn(store, 'removeFromFavorites');
    const addItem = vi.spyOn(store, 'addToFavorites');

    const { getByTestId } = render(
      <TestAddToWishBtn product={product} withText />
    );

    const buttonWithText = getByTestId('btn-with-text');
    fireEvent.click(buttonWithText);

    expect(detachItem).toHaveBeenCalled();
    expect(detachItem).toHaveBeenCalledWith(product.id);

    expect(addItem).not.toHaveBeenCalled();
  });

  test("should call the add method when the product isn't in the wishlist", () => {
    const detachItem = vi.spyOn(store, 'removeFromFavorites');
    const addItem = vi.spyOn(store, 'addToFavorites');

    const { getByTestId } = render(
      <TestAddToWishBtn product={{ ...product, id: Infinity }} withText />
    );

    const buttonWithText = getByTestId('btn-with-text');
    fireEvent.click(buttonWithText);

    expect(addItem).toHaveBeenCalled();
    expect(addItem).toHaveBeenCalledWith({ ...product, id: Infinity });

    expect(detachItem).not.toHaveBeenCalled();
  });
});
