import { Badge } from '@mantine/core';
import { useMemo } from 'react';

import { orderPalette } from "@/shared/lib/constants";

type Props = {
  name: string;
  color: string;
  palette?: { [P in string]: string }
};
export const CustomBadge = ({ name, color, palette = orderPalette }: Props) => {
    const isPalette = useMemo(() => (
      candidate: string
    ): candidate is keyof typeof palette => {
      return candidate in palette ? true : false;
    }, []);

  const type = isPalette(color) ? palette[color] : 'completed';

  return (
    <Badge
      bg={type}
      className='h-[1.375rem] px-2'
    >
      {name}
    </Badge>
  );
};