import { ComboboxItem, Group } from '@mantine/core';
import { Check } from 'lucide-react';
import Image from 'next/image';

type Props = {
  option: ComboboxItem;
  checked?: boolean;
  imagePath: string;
};

export const CustomSelectDropdown = ({ option, checked, imagePath }: Props) => {
  const { label } = option;

  return (
    <Group flex='1' gap='xs'>
      <Image src={imagePath} width={36} height={36} alt='' />
      {label}
      {checked && <Check style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );
};
