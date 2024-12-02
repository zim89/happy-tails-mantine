export const createNewCategory = (
  categoryName: string,
  description: string,
  imgSrc: string
) => {
  return {
    name: categoryName.trim(),
    title: categoryName.trim(),
    path: categoryName.toLowerCase().trim(),
    description: description.trim(),
    imgSrc,
    coordinateOnBannerX: 0,
    coordinateOnBannerY: 0,
  };
};
