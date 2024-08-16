import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import AddProduct from '@/modules/AddProduct';

export default function Page() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { text: 'Products', href: '/admin/products/' },
          { text: 'Add product' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <AddProduct />
    </>
  );
}
