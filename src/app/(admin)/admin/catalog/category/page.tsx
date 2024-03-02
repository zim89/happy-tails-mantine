'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './category.module.css';

import { CategoriesProvider } from '@/modules/CategoriesTable/lib/utils';
import Table from '@/modules/CategoriesTable/CategoriesTable';
import AddCategory from "@/modules/AddCategoryModal/AddCategoryModal";

import { useFakeCategoriesQuery } from "@/shared/api/admin_categoryApi";

export default function CategoryPage() {
  const { data, isError, isLoading, isUninitialized } = useFakeCategoriesQuery();

  if (isLoading || isUninitialized) 
    return <p>Loading, please wait</p>
  
  if (isError)
    return <p>Oops, something went wrong</p>

  return (
    <CategoriesProvider>
      <div className={styles.pageWrapper}>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Admin' }, { text: 'category' }]}
        />

        <AddCategory/>
        <Table categories={data} />

      </div>
    </CategoriesProvider>
  );
}
