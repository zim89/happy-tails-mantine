'use client';

import PageHeader from '@/components/PageHeader';
import { useFindOneQuery } from '@/shared/api/productApi';

import { Form } from './components/Form';
import { UpdateProductProvider } from './lib/utils';
import { Sizes } from './components/Sizes';
import { Controls } from './components/Controls';
import { EditProductSkeleton } from './components/EditProductSkeleton';

type Props = {
  id: string;
};

export default function EditProduct({ id }: Props) {
  const { data, error, isLoading } = useFindOneQuery(id);

  if (error) return null;
  if (isLoading || !data) return <EditProductSkeleton />;

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
      <Controls />
    </UpdateProductProvider>
  );
}
