import Breadcrumbs from '@/components/Breadcrumbs';
import UserDetails from '@/modules/UserDetails';

type Props = {
    params: { id: string }
}
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { text: 'Users', href: '/admin/users/' },
          { text: 'Profile' },
        ]}
        classNames={{
          root: "p-0 m-0 mb-8"
        }}
      />

      <UserDetails id={id}/>
    </>
  );
}
