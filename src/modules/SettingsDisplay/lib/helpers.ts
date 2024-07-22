import { Post } from '@/shared/api/postApi';
import { Category, Product } from '@/shared/types/types';

const regex = /https?:\/\/[^\/]+\/([a-zA-Z0-9&-]+)(?:\/(\d+))?/;

type Params = {
  targetString: string;
  categories: Category[];
  posts: Post[];
  products: Product[];
};

export const findImageSource = ({
  targetString,
  categories,
  posts,
  products,
}: Params) => {
  const match = targetString.match(regex);

  const selection =
    match && match[1]
      ? !match[2]
        ? categories.find((cat) => cat.path === match[1])?.imgSrc
        : match[1] === 'products'
          ? products.find((prod) => prod.id === Number(match[2]))?.imagePath
          : match[1] === 'blog'
            ? posts.find((p) => p.id === Number(match[2]))?.posterImgSrc
            : null
      : null;

  return selection;
};
