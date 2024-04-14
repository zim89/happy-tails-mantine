import { Badge } from '@mantine/core';

const colorPalette = {
  'in progress': '#fbbc04',
  new: '#4285f4',
  cancelled: '#c63129',
  shipped: '#2a7436',
  completed: '#b4b4b4',
  'return processing': '#84201c',
  processing: '#389b48',
};

type Props = {
  name: string;
  color: string;
  palette?: { [P in string]: string }
};
export const CustomBadge = ({ name, color, palette = colorPalette }: Props) => {
    const isPalette = (
      candidate: string
    ): candidate is keyof typeof palette => {
      return candidate in palette ? true : false;
    };

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