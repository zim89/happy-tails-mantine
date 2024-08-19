import { rem } from '@mantine/core';

import { cn } from '@/shared/lib/utils';

export type Props = {
  message: string;
  visible: boolean;
  className?: string;
};
export const EmptyRow = ({ visible, message, className }: Props) => {
  if (!visible) return;

  return (
    <p
      className={cn(
        `border border-brand-grey-300 p-4 text-sm/[${rem(21)}] text-brand-grey-800`,
        className
      )}
    >
      {message}
    </p>
  );
};
