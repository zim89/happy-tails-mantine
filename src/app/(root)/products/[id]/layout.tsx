import { notFound } from 'next/navigation';

import ProductAdditionalInfo from '@/components/ProductAdditionalInfo/ProductAdditionalInfo';
import { getProductById } from '@/shared/lib/requests';
import { toast } from 'react-toastify';
import { handleError } from '@/shared/helpers/error.helpers';

const getProduct = async (id: string) => {
  return await getProductById(id);
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);

    if (!product) {
      return notFound();
    }

    let meta = {
      title: `${product.totalQuantity < 10 ? 'Almost Out of Stock | ' : 'Buy Freely! | '} ${product.name} | Happy Tails`,
      description: `${product.totalQuantity < 10 ? 'Almost Sold Out! ' + 'Grab This ' + product.name + " Before It's Gone for Excellent Price: " + product.price + '$' : 'Spoil Your Pup! Shop This ' + product.name + ' Now! ' + 'Get Yours Almost For Nothing: ' + product.price + "$ You Don't Want to Miss it Out!"}`,
    };

    return {
      title: meta.title,
      description: meta.description,
    };
  } catch (err) {
    handleError(err, toast.error);
  }
}
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ProductAdditionalInfo />
    </>
  );
}
