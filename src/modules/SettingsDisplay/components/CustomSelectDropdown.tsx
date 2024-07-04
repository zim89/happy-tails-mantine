import { useSelectProducts } from '@/shared/hooks/useSelectProducts';
import { Group, SelectProps } from '@mantine/core';
import { Check } from 'lucide-react';
import Image from 'next/image';

const regex = /(\d+$)/;

export const CustomSelectDropdown: SelectProps['renderOption'] = ({
  option,
  checked,
}) => {
  const { label } = option;
  const match = label.match(regex);
  const id = match ? Number(match[1]) : -1;

  const candidate = useSelectProducts((state) =>
    state.find((prod) => prod.id === id)
  );

  return (
    <Group flex='1' gap='xs'>
      <Image
        src={
          candidate && candidate.imagePath
            ? candidate.imagePath
            : 'https://placehold.co/36x36.png'
        }
        width={36}
        height={36}
        alt=''
      />
      {label}
      {checked && <Check style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );
};
