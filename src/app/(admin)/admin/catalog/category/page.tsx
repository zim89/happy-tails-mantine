import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './category.module.css';

import CategoriesDisplay from '@/modules/CategoriesDisplay/CategoriesDisplay';
import AddCategory from '@/modules/AddCategoryModal/AddCategoryModal';

export default function CategoryPage() {
  return (
    <>
      <div className={styles.pageWrapper} style={{ position: 'relative' }}>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'category' }]}
        />

        <AddCategory />
        <CategoriesDisplay />
      </div>
    </>
  );
}
