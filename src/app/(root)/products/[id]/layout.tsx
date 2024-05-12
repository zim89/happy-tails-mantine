import ProductAdditionalInfo from '@/components/ProductAdditionalInfo';
import { getProductById } from '@/shared/lib/requests';
import { AxiosError } from 'axios';
import { notFound } from 'next/navigation';

const getProduct = async (id: string) => {
  return await getProductById(id);
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);

    if (!product) {
      return notFound();
    }

    let meta = {
      title: `${product.quantity < 10 ? 'Almost Out of Stock | ' : 'Buy Freely! | '} ${product.name} | Happy Tails`,
      description: `${product.quantity < 10 ? 'Almost Sold Out! ' + 'Grab This ' + product.name + " Before It's Gone for Excellent Price: " + product.price + '$' : 'Spoil Your Pup! Shop This ' + product.name + ' Now! ' + 'Get Yours Almost For Nothing: ' + product.price + "$ You Don't Want to Miss it Out!"}`,
    };

    return {
      title: meta.title,
      description: meta.description,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
    }
  }
}
export default function DashboardLayout({
  children
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
