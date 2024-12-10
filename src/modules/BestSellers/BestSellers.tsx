import dynamic from 'next/dynamic';

const ProductSlider = dynamic(
  () => import('../ProductDetails/ui/ProductSlider'),
  { ssr: false }
);

async function fetchBestSellers() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/products/best-sellers'
  ); // Adjust the URL to your API endpoint
  if (!res.ok) {
    throw new Error('Failed to fetch best sellers');
  }
  const data = await res.json();
  return data.content || [];
}

export default async function BestSellers() {
  const bestSellers = await fetchBestSellers();

  return (
    <section className='pt-12 md:pt-16 lg:pt-[5.5rem]'>
      <h2 className='mb-6 text-center text-[1.75rem] uppercase md:mb-9 lg:text-4xl'>
        Our Bestseller
      </h2>

      <ProductSlider
        alt
        data={bestSellers}
        className='relative max-md:left-1/2 max-md:right-1/2 max-md:-ml-[50vw] max-md:-mr-[50vw] max-md:!w-screen max-md:!max-w-full max-md:!p-0'
      />
    </section>
  );
}
