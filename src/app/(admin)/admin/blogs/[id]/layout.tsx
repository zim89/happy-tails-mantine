'use client';

import Loader from '@/components/Loader/Loader';
import { useFindOneQuery } from '@/shared/api/postApi';
import { NOT_FOUND } from '@/shared/constants/httpCodes';
import { PostFormProvider } from '@/shared/context/postform.context';
import { isAxiosQueryError } from '@/shared/lib/helpers';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default function Layout({ children, params }: Props) {
  const { data, isLoading, error } = useFindOneQuery({ id: params.id });

  if (isLoading) return <Loader />;

  if (isAxiosQueryError(error) && error.status === NOT_FOUND) notFound();

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this!"
        }
      </p>
    );

  return <PostFormProvider post={data}>{children}</PostFormProvider>;
}
