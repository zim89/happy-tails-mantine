'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, XCircle } from 'lucide-react';

import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogProductList from '@/modules/CatalogProductList';
import { type Category, getAllCategories } from '@/shared/api/categoryApi';
import Toolbar from '@/modules/Toolbar';
import ProductCountContextProvider from '@/modules/CatalogProductList/ProductCountContext';

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
};

interface Props {
  searchParams: {
    name: string;
    page?: string;
  };
}

export default function Page({ searchParams }: Props) {
  const query = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();
  const isFirstRender = useRef(true);

  const [inputValue, setInputValue] = useState(searchParams.name);
  const [debounced] = useDebouncedValue(inputValue, 300);
  const [categories, setCategories] = useState<Category[]>([]);

  const onChange = (value: string) => {
    const params = new URLSearchParams(query);
    params.set('page', '1');
    replace(`${path}?${params.toString()}`);
    setInputValue(value);
  };

  const onReset = () => {
    const params = new URLSearchParams(query);
    params.set('page', '1');
    replace(`${path}?${params.toString()}`);
    setInputValue('');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isFirstRender) {
      const params = new URLSearchParams(query);
      debounced ? params.set('name', debounced) : params.delete('name');
      replace(`${path}?${params.toString()}`);
    }
  }, [debounced, path, query, replace]);

  useEffect(() => {
    (async () => {
      const { content: categories } = await getAllCategories();
      setCategories(categories);
    })();
  }, []);

  return (
    <Container>
      <div className='pb-12'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: 'Search' }]}
        />

        <div className='mb-8 space-y-4 md:mx-auto md:mb-12 md:w-[458px] lg:mb-16 lg:w-[572px]'>
          <h2 className='heading text-center'>Search results</h2>
          <div className='relative'>
            <TextInput
              placeholder='What are you looking for?'
              leftSection={<Search className='h-4 w-4' />}
              value={inputValue}
              onChange={(event) => onChange(event.currentTarget.value)}
              classNames={{
                input:
                  'rounded-0.5 border border-brand-grey-400 bg-primary py-3 pl-8 pr-4 text-base placeholder:text-base placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary',
                section: 'text-brand-grey-600',
              }}
            />
            {inputValue && (
              <button
                className='group absolute right-3 top-1/2 -translate-y-1/2'
                onClick={onReset}
              >
                <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
              </button>
            )}
          </div>
        </div>

        <ProductCountContextProvider>
          <Toolbar category={category} categories={categories} />
          <CatalogProductList />
        </ProductCountContextProvider>
      </div>
    </Container>
  );
}
