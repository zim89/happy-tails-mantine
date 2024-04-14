import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

type Props = {
    form: UseFormReturnType<
      NewOrderFields,
      (values: NewOrderFields) => NewOrderFields
    >;
  };

export default function AddComments({ form }: Props) {
  return (
    <div className={'flex flex-col gap-2'}>
      <label className={'text-sm/normal'}>Add comments</label>
      <Textarea
        classNames={{
          input: 'text-input min-h-[14.375rem]',
          wrapper: 'max-w-[40.75rem]',
        }}
        {...form.getInputProps('comment')}
      />
    </div>
  );
}
