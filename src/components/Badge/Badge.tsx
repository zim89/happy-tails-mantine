import { Badge } from '@mantine/core';
import { useMemo } from 'react';

import { orderPalette } from "@/shared/lib/constants";
import classes from "./classes.module.css";

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
    }, [palette]);

  const type = isPalette(color) ? palette[color] : 'completed';

  return (
    <Badge
      bg={type}
      className={classes.badge}
    >
      {name}
    </Badge>
  );
};