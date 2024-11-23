import Link from 'next/link';

export const EmptyPage = () => {
  return (
    <section className={'pb-24 pt-12 md:pb-36 lg:pt-16'}>
      <div className='container'>
        <h3
          className={
            'mb-2 text-center text-2xl/normal font-light md:mx-auto md:w-[400px] lg:w-full'
          }
        >
          Your Wishlist is empty! Start adding items now.
        </h3>
        <p
          className={
            'mb-8 text-center text-base font-light md:mx-auto md:w-[448px] lg:w-[552px]'
          }
        >
          The Wishlist feature simplifies the process of tracking everything you
          adore and your shopping activities, whether you&apos;re using your
          computer, phone, or tablet. No more wasting time searching for that
          item you loved on your phone the other day—it&apos;s all conveniently
          stored in one place!
        </p>

        <div className={'flex justify-center'}>
          <Link
            href={'/products'}
            className={'btn btn-primary inline-block w-full md:w-auto'}
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
};
