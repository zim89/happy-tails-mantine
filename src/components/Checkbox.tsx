import { cn } from '@/lib/utils';
import { CheckboxProps, Checkbox as RawCheckbox } from '@mantine/core';
import { Check } from 'lucide-react';

const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...props }) => (
  <Check
    {...props}
    className={cn(props.className, 'h-3 w-3')}
    width={12}
    height={12}
  />
);

export default function Checkbox(props: CheckboxProps) {
  return (
    <RawCheckbox
      size='18'
      icon={CheckboxIcon}
      radius={2}
      color='black'
      classNames={{ input: 'border-secondary' }}
      {...props}
    />
  );
}
