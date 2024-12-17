import React from 'react';

import Logo from '@/components/Logo';

type ChildrenProps = {
  Logo: () => React.ReactNode;
};

export type Props = {
  children({ Logo }: ChildrenProps): React.ReactNode;
  themed?: true;
};
export default function HeaderTemplate({ children, themed }: Props) {
  return (
    <header className='width-before-scroll-bar fixed left-0 right-0 top-0 z-40 border-b border-b-brand-grey-300 bg-primary'>
      {children({ Logo: () => Logo({ themed }) })}
    </header>
  );
}
