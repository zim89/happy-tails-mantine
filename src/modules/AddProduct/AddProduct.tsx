'use client';

import { useContext } from 'react';

import { Form } from './components/Form';
import { Variants } from './components/Variants';
import { AddProductProvider } from './lib/utils';
import { Controls } from './components/Controls';
import PageHeader from '@/components/PageHeader';
import { notifyContext } from '@/shared/context/notification.context';

export default function AddProduct() {
  const { setNotification } = useContext(notifyContext);

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
      <Controls setNotification={setNotification} />
    </AddProductProvider>
  );
}
