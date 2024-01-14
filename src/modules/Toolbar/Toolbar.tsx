import { Category } from '@/shared/api/categoryApi';
import SortBy, { type Option } from './components/SortBy';
import Filter from './components/Filter';

const sortOptions: Option[] = [
  { title: 'Featured', value: 'featured' },
  { title: 'Price, Low to High', value: 'price-asc' },
  { title: 'Price, High to Low', value: 'price-des' },
  { title: 'Alphabetically, A - Z', value: 'name-asc' },
  { title: 'Alphabetically, Z - A', value: 'name-des' },
];

export default function Toolbar({ category }: { category: Category }) {
  return (
    <div className='mb-4 flex items-center text-sm/4 md:py-2 md:text-base'>
      <Filter />
      <p className='hidden md:block'>{category?.productCount} Results</p>
      <SortBy options={sortOptions} />
    </div>
  );
}
