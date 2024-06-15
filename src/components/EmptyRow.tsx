import { cn } from '@/shared/lib/utils';

type Props = {
  message: string;
  visible: boolean;
  className?: string;
};
export const EmptyRow = ({ visible, message, className }: Props) => {
  if (!visible) return;

  return (
    <p
      className={cn(
        'border-[1px] border-[#EEE] p-4 text-sm/[21px] text-[#787878]',
        className
      )}
    >
      {message}
    </p>
  );
};
