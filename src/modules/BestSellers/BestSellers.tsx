import ProductSlider from '../ProductDetails/ui/ProductSlider';

export default function BestSellers() {
  return (
    <section className='pt-12 md:pt-16 lg:pt-[5.5rem]'>
      <h2 className='mb-6 text-center text-[1.75rem] uppercase md:mb-9 lg:text-4xl'>
        Our Bestseller
      </h2>

      <ProductSlider alt />
    </section>
  );
}
