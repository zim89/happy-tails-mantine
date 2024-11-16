import { useForm, UseFormReturnType, isNotEmpty } from '@mantine/form';
import { createContext } from 'react';
import {
  StateHistory,
  useStateHistory,
  UseStateHistoryHandlers,
} from '@mantine/hooks';

import { isContentEmptyOrShort } from '@/shared/lib/utils';
import { Post } from '../api/postApi';

type FormProviderType = {
  form: UseFormReturnType<
    {
      id: string | number;
      isHero: boolean;
      image: string | File | null;
      title: string;
      content: string;
      author: string;
    },
    (values: {
      id: string | number;
      isHero: boolean;
      image: string | File | null;
      title: string;
      content: string;
      author: string;
    }) => {
      id: string | number;
      isHero: boolean;
      image: string | File | null;
      title: string;
      content: string;
      author: string;
    }
  >;
  defaultValues: {
    id: string | number;
    isHero: boolean;
    image: string | File | null;
    title: string;
    content: string;
    author: string;
  };
  history: StateHistory<{
    id: string | number;
    isHero: boolean;
    image: string | File | null;
    title: string;
    content: string;
    author: string;
  }> &
    UseStateHistoryHandlers<{
      id: string | number;
      image: string | File | null;
      isHero: boolean;
      title: string;
      content: string;
      author: string;
    }>;
};

export const PostFormContext = createContext<FormProviderType>(
  {} as FormProviderType
);

type FormProviderProps = {
  post?: Post;
  children: React.ReactNode;
};
export const PostFormProvider = ({ children, post }: FormProviderProps) => {
  const defaultValues = {
    id: post?.id || '',
    image: post?.posterImgSrc || (null as string | File | null),
    isHero: post?.hero || false,
    title: post?.title || '',
    content: post?.content || '<p></p>',
    author: post?.authorName || '',
  };

  // It's used for rolling back changes after pre-viewing a post
  const [_, handlers, history] = useStateHistory(defaultValues);

  const titlePattern = /^[A-Za-z0-9\s\-_,\.;:()]+$/;

  const form = useForm({
    initialValues: defaultValues,
    validate: {
      title: (value) => {
        if (value.trim().length < 2) {
          return 'The title should be descriptive.';
        } else if (!titlePattern.test(value)) {
          return 'The title is incorrect';
        }

        return null;
      },
      content: (value) => {
        // Initially the value equals "" but after editing <p>{content}</p>
        if (
          !value.trim().length ||
          value === '<p></p>' ||
          isContentEmptyOrShort(value)
        ) {
          return 'The content must be reasonable.';
        }

        return null;
      },
      image: isNotEmpty('Post poster is required.'),
    },
  });

  return (
    <PostFormContext.Provider
      value={{ form, defaultValues, history: { ...history, ...handlers } }}
    >
      {children}
    </PostFormContext.Provider>
  );
};
