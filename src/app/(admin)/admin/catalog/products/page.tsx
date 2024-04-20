import Breadcrumbs from '@/components/Breadcrumbs';
import AdminProductsDisplay from '@/modules/AdminProductsDisplay';

export default async function Page() {
  return (
    <div>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Products' }]}
      />

     <AdminProductsDisplay />
    </div>
  );
}
