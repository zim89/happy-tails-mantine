import { Metadata } from 'next';

import NotFoundComponent from '@/components/NotFound';
import LayoutTemplate from '@/components/LayoutTemplate/LayoutTemplate';

export const metadata: Metadata = {
  title: 'Not Found | 404',
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <LayoutTemplate>
      <NotFoundComponent />
    </LayoutTemplate>
  );
}
