import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, XCircle } from 'lucide-react';
import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { cn } from '@/shared/lib/utils';

type Props = {
  placeholder?: string;
  classNames?: {
    root?: string;
    input?: string;
    button?: string;
  };
};
export const Field = ({
  placeholder = 'What are you looking for?',
  classNames,
}: Props) => {
  const [value, setValue] = useState('');
  const { replace } = useRouter();
  const path = usePathname();
  const query = useSearchParams();
  const [debounced] = useDebouncedValue(value, 300, { leading: true });

  const onReset = () => {
    const params = new URLSearchParams(query);
    params.set('page', '1');
    replace(`${path}?${params.toString()}`);
    setValue('');
  };

  const onChange = (value: string) => {
    const params = new URLSearchParams(query);
    params.set('page', '1');
    replace(`${path}?${params.toString()}`);
    setValue(value);
  };

  useEffect(() => {
    setValue(query.get('name') || '');
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(query);
    debounced ? params.set('name', debounced) : params.delete('name');
    replace(`${path}?${params.toString()}`);
  }, [debounced, path, query, replace]);

  return (
    <div className={cn('relative', classNames?.root)}>
      <TextInput
        placeholder={placeholder}
        leftSection={<Search className='h-4 w-4' />}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        classNames={{
          input: cn(
            'form-input rounded-0.5 border border-brand-grey-400 bg-primary py-3 pl-8 pr-4 text-base placeholder:text-base placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary',
            classNames?.input
          ),
          section: 'text-brand-grey-600',
        }}
      />
      {value && (
        <button
          className={cn(
            'group absolute right-3 top-1/2 -translate-y-1/2',
            classNames?.button
          )}
          onClick={onReset}
        >
          <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
        </button>
      )}
    </div>
  );
};
