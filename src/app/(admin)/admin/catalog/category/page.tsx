'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './category.module.css';

import { CategoriesProvider } from '@/modules/CategoriesTable/lib/utils';
import Table from '@/modules/CategoriesTable/CategoriesTable';
import AddCategory from "@/modules/AddCategoryModal/AddCategoryModal";

export default function CategoryPage() {
  return (
    <CategoriesProvider>
      <div className={styles.pageWrapper}>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Admin' }, { text: 'category' }]}
        />

        <AddCategory/>
        <Table />

      </div>
    </CategoriesProvider>
  );
}
