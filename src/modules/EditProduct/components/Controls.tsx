import { UnstyledButton } from '@mantine/core';
import { useContext, useEffect } from 'react';

import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { context } from '../lib/utils';

import BlockLink from '@/modules/BlockLink';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import {
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '@/shared/constants/httpCodes';

export const Controls = () => {
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
      brandNotification('SUCCESS', 'Product saved successfully!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        if (
          err.status === UNSUPPORTED_TYPE ||
          err.status === TOO_LARGE_PAYLOAD
        ) {
          productForm.setFieldValue('image', null);
          productForm.setFieldError('image', `${err.data}`);
        } else {
          brandNotification(
            'ERROR',
            isErrorDataString(err.data) ? err.data : err.data.message
          );
        }
      } else {
        brandNotification(
          'ERROR',
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
