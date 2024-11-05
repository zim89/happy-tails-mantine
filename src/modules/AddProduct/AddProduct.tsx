'use client';

import PageHeader from '@/components/PageHeader';
import { Form } from './components/Form';
import { Variants } from './components/Variants';
import { AddProductProvider } from './lib/utils';
import { Controls } from './components/Controls';

export default function AddProduct() {
  return (
    <AddProductProvider>
      <PageHeader>
        {(Group) => (
          <>
            <Group
              title='Add New Product'
              additional='Product addition by manager. Fields marked with (*) are mandatory.'
            />
          </>
        )}
      </PageHeader>

      <Form />
      <Variants />
      <Controls />
    </AddProductProvider>
  );
}
