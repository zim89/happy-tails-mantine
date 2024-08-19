import { Table } from '@mantine/core';
import { useMemo } from 'react';

import CategoryLine from './CategoryRow';
import styles from '../CategoriesDisplay.module.css';
import { Category } from '@/shared/types/types';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';

type Props = {
  categories: Category[];
};

export default function CategoriesTable({ categories }: Props) {
  const ths = (
    <Table.Tr bg='#EEE' classNames={{ tr: styles.categoryHeadrow }}>
      <Table.Th classNames={{ th: 'p-4' }}>Image</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Items in this category</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const tbs = useMemo(() => {
    return categories.map((item, index) => (
      <CategoryLine key={index} {...item} />
    ));
  }, [categories]);

  return (
    <>
      <div className={styles.table}>
        <div className='flex items-center justify-between border border-b-0 bg-white px-4 py-6'>
          <h2 className='mr-6 text-base/[1.5rem] font-bold'>
            Products Catalog
          </h2>
        </div>
        <Table
          highlightOnHover
          horizontalSpacing={16}
          width={'100%'}
          border={1}
          borderColor='#EEE'
          withTableBorder
        >
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{tbs}</Table.Tbody>
        </Table>
        <div className='text-left'>
          <EmptyRow
            visible={categories.length === 0}
            message='You have not added any category yet'
          />
        </div>
      </div>
    </>
  );
}
