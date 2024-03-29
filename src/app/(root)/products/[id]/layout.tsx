import ProductAdditionalInfo from '@/components/ProductAdditionalInfo';
// import { getProductById, productApi } from "@/shared/api/productApi"; 

// export async function generateMetadata({params}: { params: { id: string } }) {
//   try {
//     const { data: product, isError, isLoading, error } = productApi.useFindOneQuery(
//       params.id
//     );
  
//     if (!product) {
//       return {
//         title: 'Not found',
//         description: 'The product you are looking does not exist.',
//       };
//     }

//     let meta = {
//       title: `${product.quantity < 10 ? "Almost Out of Stock | " : "Buy Freely! | "} ${product.name} | Happy Tails`,
//       description: `${(product.quantity < 10) ? "Almost Sold Out! " + "Grab This " + product.name + " Before It's Gone for Excellent Price: " + product.price + "$": "Spoil Your Pup! Shop This " + product.name + " Now! " + "Get Yours Almost For Nothing: " + product.price + "$ You Don't Want to Miss it Out!"}`
//     }

//     return {
//       title: meta.title,
//       description: meta.description
//     }
//   } catch (err) {
//     if (err instanceof Error) throw err;
//   }
// }
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