import { cn } from '@/shared/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import classes from './classes.module.css';

type Props = {
  loading: boolean;
  children: React.ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const LoaderBackground = ({ children, loading, ...props }: Props) => {
  if (!loading) return <div className={props.className}>{children}</div>;

  return (
    <div {...props} className={cn('p-1', classes.loaderBg, props.className)}>
      {children}
    </div>
  );
};
