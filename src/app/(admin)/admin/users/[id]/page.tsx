import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import UserDetails from '@/modules/UserDetails';

type Props = {
  params: { id: string };
  searchParams: { fromPage: string };
};
export default function Page({ params: { id }, searchParams }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          {
            text: 'Users',
            href: `/admin/users?page=${searchParams.fromPage || 1}`,
          },
          { text: 'Profile' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />

      <UserDetails id={id} />
    </>
  );
}
