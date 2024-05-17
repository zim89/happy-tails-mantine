import { cn } from '@/shared/lib/utils';
import { TextInput } from '@mantine/core';
import { Search } from 'lucide-react';

type Props = {
  value: string;
  handleChange: (value: string) => void;
};
export const SearchEntry = ({ value, handleChange }: Props) => {
  return (
    <TextInput
      defaultValue={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder='Search'
      width={297}
      leftSection={<Search className='h-4 w-4' />}
      classNames={{
        root: 'form-root',
        label: 'form-label',
        input:
          'form-input rounded-0.5 border border-brand-grey-400 bg-primary py-2 pl-8 pr-4 text-base placeholder:text-sm/[21px] placeholder:font-lato placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary',
        section: 'text-brand-grey-600',
      }}
    />
  );
};
