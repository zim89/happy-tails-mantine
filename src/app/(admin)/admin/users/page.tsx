import Breadcrumbs from '@/components/Breadcrumbs';
import AdminUsersDisplay from '@/modules/AdminUsersDisplay';

export default function UsersPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Users' }]}
        classNames={{
          root: "p-0 mb-8"
        }}
      />
      
      <hgroup>
        <h2 className="mr-1 text-[32px]/[38.4px] font-black">User list</h2>
        <p>View and edit profiles of all users registered on your store</p>
      </hgroup>

      <AdminUsersDisplay />      
    </>
  );
}
