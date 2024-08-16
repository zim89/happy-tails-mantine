'use client';

import { useContext } from 'react';

import PageHeader from '@/components/PageHeader';
import { notifyContext } from '@/shared/context/notification.context';
import { Form } from './components/Form';
import { UpdateProductProvider } from './lib/utils';
import { useFindOneQuery } from '@/shared/api/productApi';
import Loader from '@/components/Loader/Loader';
import { Sizes } from './components/Sizes';
import { Controls } from './components/Controls';

type Props = {
  id: string;
};

export default function EditProduct({ id }: Props) {
  const { setNotification } = useContext(notifyContext);
  const { data, error, isLoading } = useFindOneQuery(id);

  if (error) return null;
  if (isLoading || !data) return <Loader />;

  return (
    <UpdateProductProvider product={data}>
      <PageHeader>
        {(Group) => (
          <>
            <Group
              title='Edit Product'
              additional='Product editing by manager. Fields marked with (*) are mandatory.'
            />
          </>
        )}
      </PageHeader>
      <Form />
      <Sizes />
      <Controls productId={id} setNotification={setNotification} />
    </UpdateProductProvider>
  );
}
