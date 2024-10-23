import { TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useSearchString } from '@/shared/helpers/searchParams.helpers';

export type Props = {
  value: string;
  handleChange: (value: string) => void;
};
export const SearchEntry = ({ value, handleChange }: Props) => {
  const router = useRouter();

  const params = useSearchParams();
  const [createQueryString] = useSearchString(params);

  useEffect(() => {
    if (value) {
      router.replace(
        '?' +
          createQueryString({
            search: value,
            page: '1',
          })
      );
    } else {
      router.replace(
        '?' +
          createQueryString({
            search: '',
          })
      );
    }
  }, [value]);

  return (
    <TextInput
      defaultValue={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder='Search'
      data-testid='search'
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
