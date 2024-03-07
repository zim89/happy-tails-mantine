import ProductAdditionalInfo from '@/components/ProductAdditionalInfo';
import { getProductById } from "@/shared/api/productApi"; 

export async function generateMetadata({params}: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id);
  
    if (!product) {
      return {
        title: 'Not found',
        description: 'The product you are looking does not exist.',
      };
    }
  
    return {
      title: product.name + " | Happy Tails",
      description: product.description
    }
  } catch (err) {
    if (err instanceof Error) throw err;
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
};