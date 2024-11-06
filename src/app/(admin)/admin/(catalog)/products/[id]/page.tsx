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
  searchParams: {
    fromPage: string;
  };
};

export default function Page({ params, searchParams }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          {
            text: 'Products',
            href: `/admin/products?page=${searchParams.fromPage || 1}`,
          },
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
