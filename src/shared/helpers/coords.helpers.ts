import { Category } from '../types/types';

export type TCategoryBadge = Pick<Category, 'id' | 'name' | 'path'> & {
  x: Category['coordinateOnBannerX'];
  y: Category['coordinateOnBannerY'];
};

export const BADGE_HEIGHT = 36;

export const parseCoordinates = (categories: Category[]): TCategoryBadge[] => {
  return categories.map(
    (cat) =>
      ({
        id: cat.id,
        x: cat.coordinateOnBannerX,
        y: cat.coordinateOnBannerY,
        name: cat.name,
        path: cat.path,
      }) as TCategoryBadge
  );
};
