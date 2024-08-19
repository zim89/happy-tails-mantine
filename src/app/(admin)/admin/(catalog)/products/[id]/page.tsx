import { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import EditProduct from '@/modules/EditProduct';

export const metadata: Metadata = {
  title: 'Edit product page',
  robots: {
    index: false,
    indexifembedded: false,
  },
};

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { text: 'Products', href: '/admin/products/' },
          { text: 'Edit product' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <EditProduct id={params.id} />
    </>
  );
}
