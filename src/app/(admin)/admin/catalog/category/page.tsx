'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './category.module.css';

import Table from '@/modules/CategoriesTable/CategoriesTable';
import AddCategory from '@/modules/AddCategoryModal/AddCategoryModal';

import { useCategoriesQuery } from '@/shared/api/categoryApi';

export default function CategoryPage() {
  const { data, isError, isLoading, isUninitialized } = useCategoriesQuery();

  if (isLoading || isUninitialized) return <p>Loading, please wait</p>;

  if (isError) return <p>Oops, something went wrong</p>;

  return (
    <>
      <div className={styles.pageWrapper} style={{ position: 'relative' }}>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Admin' }, { text: 'category' }]}
        />

        <AddCategory />
        <Table categories={data.content} />
      </div>
    </>
  );
}
