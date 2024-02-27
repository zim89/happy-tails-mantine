import { cn } from '@/shared/lib/utils';
import { RadioProps, Radio as RawRadio } from '@mantine/core';
import { Check } from 'lucide-react';

const RadioIcon: RadioProps['icon'] = ({ ...props }) => (
  <Check {...props} className={cn(props.className)} width={12} height={12} />
);

export default function RadioCheck(props: RadioProps) {
  return (
    <RawRadio
      style={{ '--radio-icon-size': '12px' }}
      size='sm'
      icon={RadioIcon}
      radius={2}
      color='black'
      classNames={{
        radio:
          'border-secondary disabled:opacity-50 disabled:cursor-not-allowed',
      }}
      {...props}
    />
  );
}
