import { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import AdminUsersDisplay from '@/modules/AdminUsersDisplay';

export const metadata: Metadata = {
  title: 'Admin Users',
  robots: {
    index: false,
  },
};

export default function UsersPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Users' }]}
        classNames={{
          root: 'p-0 mb-8',
        }}
      />

      <hgroup>
        <h2 className='mr-1 text-[2rem]/[2.4rem] font-black'>User list</h2>
        <p>View and edit profiles of all users registered on your store</p>
      </hgroup>

      <AdminUsersDisplay />
    </>
  );
}
