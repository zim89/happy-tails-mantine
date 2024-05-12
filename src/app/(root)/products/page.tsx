import { MDXRemote } from 'next-mdx-remote/rsc';

import ProductCountContextProvider from '@/modules/CatalogProductList/ProductCountContext';
import ProductList from '@/modules/CatalogProductList';
import Breadcrumbs from '@/components/Breadcrumbs';
import Overview from '@/components/Overview';
import Toolbar from '@/modules/Toolbar';
import { BackendResponse, Category, Product } from '@/shared/types/types';
import { getAllCategories } from '@/shared/lib/requests';

const category: Category = {
  id: 0,
  name: 'All Products',
  title: 'Premium Dog Products',
  description:
    'We understand that your furry friend deserves nothing but the best. Discover a delightful array of high-quality products designed to enhance your dog&apos;s comfort, happiness, and well-being',
  overview: `From cozy beds to stylish apparel, interactive toys to nutritious treats, our curated collection offers a wide range of items to cater to your dog's every need. Each product is thoughtfully selected to ensure your canine companion experiences ultimate joy and care. Experience the joy of pampering your beloved companion with the finest dog products available. Our commitment to quality ensures that your dog receives the care they truly deserve. Explore our catalog now and elevate your dog's lifestyle to new heights of comfort and happiness!
### Comfortable Rest
Explore our luxurious dog beds and cozy sleeping options that provide your pup with the perfect place to unwind after a day of play. <ins>Plush Bolster Bed for Small Breeds, Cozy Donut Cuddler Bed</ins> - our beds provide optimal support and comfort, ensuring your canine companion enjoys restful sleep
### Tail-Wagging Fashion
Dress your furry friend in style with our trendy dog apparel, from adorable sweaters to practical raincoats, making walks and outings a fashion statement. Waterproof raincoats, doggie bandanas in various prints, adorable dog bowties or reflective safety vests for night walks our clother collection combines fashion and function!
### Engaging Playtime
Choose from an assortment of interactive toys that keep them entertained for hours on end.
### Grooming and Wellness
Discover grooming products that promote your dog's hygiene and well-being, from gentle shampoos to effective tick and flea solutions.
### Travel Essentials
Make adventures with your dog stress-free with our travel-friendly accessories, including collapsible bowls, comfortable carriers, and more.
### Stylish Collars and Durable Leads
Ensure your dog's safety and style during walks with our exquisite collection of collars and leads. Choose from a range of designs and materials that blend fashion and functionality seamlessly.`,
  path: 'products',
  productCount: 0,
  imgSrc: null,
  createdAt: 0,
  updatedAt: null,
  coordinateOnBannerX: 0,
  coordinateOnBannerY: 0,
};

export default async function AllProducts() {
  const categories = await getAllCategories();
  const { totalElements } = (await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/products?size=1'
  ).then((res) => res.json())) as BackendResponse<Product>;

  category.productCount = totalElements;

  return (
    <>
      <div className='pb-6 pt-2 md:pb-9 md:pt-4 lg:pb-12'>
        <div className='container text-center'>
          <Breadcrumbs
            crumbs={[{ href: '/', text: 'Home' }, { text: 'All Products' }]}
            classNames={{ root: "p-0 pt-2" }}
          />
          <h2 className='mb-2 text-[1.75rem]/[normal] lg:text-4xl/[normal]'>
            Premium Dog Products
          </h2>
          <p className='mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
            We understand that your furry friend deserves nothing but the best.
            Discover a delightful array of high-quality products designed to
            enhance your dog&apos;s comfort, happiness, and well-being
          </p>
          <ProductCountContextProvider>
            <Toolbar category={category} categories={categories} />
            <ProductList />
          </ProductCountContextProvider>
          <Overview>
            <MDXRemote source={category.overview.replace(/\\n/g, '\n')} />
          </Overview>
        </div>
      </div>
    </>
  );
}