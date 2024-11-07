import { cn } from '@/shared/lib/utils';
import { CustomComponentProps } from '@/shared/types/types';

export type Props = {
  children: React.ReactNode;
  title: string;
  rightSection?: React.ReactNode;
  contentClassname?: string;
} & CustomComponentProps;

export default function BrandBox({
  children,
  title,
  className = '',
  contentClassname = '',
  rightSection,
}: Props) {
  return (
    <div
      data-testid='box-container'
      className={cn(
        'mt-8 overflow-clip rounded-t border border-brand-grey-300 bg-white',
        className
      )}
    >
      <h3 className='flex items-center justify-between bg-brand-grey-300 p-4 text-xl font-bold'>
        {title}
        {rightSection}
      </h3>
      <div className={cn('p-4', contentClassname)}>{children}</div>
    </div>
  );
}
