import { useContext } from 'react';
import { Checkbox } from '@mantine/core';
import { PostFormContext } from '@/shared/context/postform.context';

export const Details = () => {
  const { form } = useContext(PostFormContext);

  // Checked param doesn't track whether the form was cleared or not (form.reset()); see @/modules/PostDetails/components/Header.tsx - handleCancel function
  const { checked: omitted, value, ...rest } = form.getInputProps('isHero');

  return (
    <div className='mb-8 rounded border border-[#C8C8C8] bg-white'>
      <p className='p-3 text-center text-xl font-bold'>Details</p>
      <Checkbox
        color='black'
        label='Assign as the main article'
        checked={value}
        {...rest}
        classNames={{
          root: 'group py-6 mb-8 px-4 bg-[#EEE]',
          body: 'checkbox-body',
          inner: 'checkbox-inner',
          input: 'checkbox-input',
          label: 'checkbox-label font-bold',
        }}
      />
    </div>
  );
};
