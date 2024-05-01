import { Table } from '@mantine/core';
import { useMemo } from 'react';

import CategoryLine from './CategoryRow';
import styles from '../CategoriesDisplay.module.css';
import { Category } from '@/shared/types/types';

type Props = {
  categories: Category[]
};

export default function CategoriesTable({ categories }: Props) {
  
    const ths = (
      <Table.Tr bg='#EEE' className={styles.categoryHeadrow}>
        <Table.Th>Image</Table.Th>
        <Table.Th>Name</Table.Th>
        <Table.Th>Items in this category</Table.Th>
        <Table.Th>Action</Table.Th>
      </Table.Tr>
    );
  
    const tbs = useMemo(() => {  
      return categories.map((item, index) => (
        <CategoryLine key={index} {...item} />
      ));
    }, [categories.length]);

    return (
      <>
        <div className={styles.table}>
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
        </div>
      </>
    );
  };