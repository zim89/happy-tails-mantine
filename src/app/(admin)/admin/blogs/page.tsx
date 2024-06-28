import { Metadata } from 'next';

import AdminBlogsDisplay from '@/modules/AdminBlogsDisplay';

export const metadata: Metadata = {
  title: 'Blogs Page',
  robots: {
    index: false,
  },
};
export default function Page() {
  return (
    <>
      <AdminBlogsDisplay />
    </>
  );
}
