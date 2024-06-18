'use client';

import { Check, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

import classes from './classes.module.css';
import Notify from '@/components/Notify';
import { useNotification } from '@/shared/hooks/useNotification';
import { Form } from './components/Form';
import { Variants } from './components/Variants';
import { AddProductProvider } from './lib/utils';
import { Controls } from './components/Controls';
import PageHeader from '@/components/PageHeader';

export default function AddProduct() {
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Product adding failed!',
    },
    success: {
      icon: <Check size={24} />,
      color: '#389B48',
      text: 'Product successfully added!',
    },
  });

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

      <Notify {...props} onClose={clear} />
    </AddProductProvider>
  );
}
