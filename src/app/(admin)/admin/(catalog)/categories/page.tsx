import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './categories.module.css';

import CategoriesDisplay from '@/modules/CategoriesDisplay/CategoriesDisplay';

export default function CategoryPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { text: 'Categories' },
        ]}
        classNames={{
          root: 'p-0 m-0',
        }}
      />
      <div className={styles.pageWrapper} style={{ position: 'relative' }}>
        <CategoriesDisplay />
      </div>
    </>
  );
}
