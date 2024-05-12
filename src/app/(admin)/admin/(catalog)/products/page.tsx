import Breadcrumbs from '@/components/Breadcrumbs';
import AdminProductsDisplay from '@/modules/AdminProductsDisplay';

export default async function Page() {
  return (
    <>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Products' }]}
        classNames={{
          root: "p-0 m-0 mb-8"
        }}
      />

      <AdminProductsDisplay />
    </>
  );
}
