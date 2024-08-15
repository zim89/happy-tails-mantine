import { UnstyledButton } from '@mantine/core';
import { useContext, useEffect } from 'react';

import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { context } from '../lib/utils';

import BlockLink from '@/modules/BlockLink';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';

type Props = {
  productId: string;
  setNotification: (type: 'Success' | 'Failed', text?: string) => void;
};

export const Controls = ({ setNotification }: Props) => {
  const {
    productForm,
    sizes,
    isDirty,
    handleSubmit: handlePutRequest,
  } = useContext(context);
  const { update: setUnsavedState, unsavedChanges } = useContext(
    UnsavedChangesContext
  );

  // Handle leaving while there are unsaved changes
  useEffect(() => {
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: isDirty }));
  }, [productForm.values, sizes]);

  const handleSubmit = async () => {
    try {
      await handlePutRequest();
      setUnsavedState((prev) => ({ ...prev, unsavedChanges: false }));
      setNotification('Success', 'Product saved successfully!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      } else {
        setNotification(
          'Failed',
          'An error occurred while updating the product'
        );
      }
    }
  };

  if (!unsavedChanges) return;

  return (
    <div className='mt-12 flex gap-[42px]'>
      <UnstyledButton
        classNames={{ root: 'rounded-sm font-bold px-12 py-[10px] bg-white' }}
        styles={{ root: { border: '1px solid #C8C8C8' } }}
      >
        <BlockLink href='/admin/products'>Cancel</BlockLink>
      </UnstyledButton>
      <UnstyledButton
        classNames={{
          root: 'bg-black text-white py-[10px] px-[55px] font-bold rounded-sm',
        }}
        onClick={() => handleSubmit()}
      >
        Save
      </UnstyledButton>
    </div>
  );
};
