import { TextInput, UnstyledButton } from '@mantine/core';
import { Edit2 } from 'lucide-react';
import { useState } from 'react';

import BrandBox from '@/components/BrandBox';
import DarkButton from '@/components/DarkButton';
import LightButton from '@/components/LightButton';
import { Tax, useUpdateTaxMutation } from '@/shared/api/taxApi';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import { handleError } from '@/shared/helpers/error.helpers';
import { toast } from 'react-toastify';

type Props = {
  tax: Tax;
};

export const TaxForm = ({ tax }: Props) => {
  const previousRate = tax.rate;

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTaxRate, setCurrentTaxRate] = useState(previousRate);
  const [dispatch] = useUpdateTaxMutation();

  const handleSubmit = async () => {
    try {
      setIsEditing(false);
      brandNotification('SUCCESS', 'Changes saved!');
      await dispatch({ ...tax, rate: currentTaxRate }).unwrap();
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <BrandBox
      className='max-w-[656px]'
      title={isEditing ? 'Edit the current tax' : 'The current tax'}
      rightSection={
        <UnstyledButton
          style={{
            border: '1px solid #C8C8C8',
            padding: 10,
            borderRadius: 2,
            visibility: isEditing ? 'hidden' : 'visible',
            backgroundColor: '#FFF',
          }}
          onClick={setIsEditing.bind(null, true)}
        >
          <Edit2 size={16} strokeWidth={3} />
        </UnstyledButton>
      }
    >
      <TextInput
        defaultValue={currentTaxRate}
        disabled={!isEditing}
        onChange={(val) => setCurrentTaxRate(Number(val.target.value))}
        label='Tax percentage, %'
        classNames={{
          root: 'form-root w-2/4',
          label: 'form-label',
          wrapper:
            'flex border border-brand-grey-400 rounded-sm  gap-2 focus:outline outline-2 bg-primary',
          input: cn(
            'form-input h-full border-0 px-2 outline-none',
            error && 'form-error--input'
          ),
          error: 'form-error',
        }}
        min={0}
        error={error}
        type='number'
      />
      {isEditing && (
        <div className='mt-[50px] flex w-2/4 gap-6'>
          <LightButton handler={setIsEditing.bind(null, false)}>
            Cancel
          </LightButton>
          <DarkButton disabled={currentTaxRate <= 0} handler={handleSubmit}>
            Save
          </DarkButton>
        </div>
      )}
    </BrandBox>
  );
};
