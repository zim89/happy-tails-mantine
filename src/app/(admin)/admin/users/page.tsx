import Breadcrumbs from '@/components/Breadcrumbs';
import AdminUsersDisplay from '@/modules/AdminUsersDisplay';

export default function UsersPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Users' }]}
      />
      
      <hgroup>
        <h1 className="text-[32px] font-black">User list</h1>
        <p>View and edit profiles of all users registered on your store</p>
      </hgroup>

      <AdminUsersDisplay />      
    </>
  );
}
