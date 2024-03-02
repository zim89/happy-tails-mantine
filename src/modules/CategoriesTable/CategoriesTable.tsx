"use client";

import { Table } from '@mantine/core';
import { useMemo, useRef, useState } from 'react';

import PaginationBar from '../PaginationBar';
import CategoryLine from './ui/CategoryRow';

import styles from './CategoriesTable.module.css';

import { Category } from './lib/data';
import { chunk } from './lib/utils';

type Props = {
  categories: Category[]
};
export default ({ categories }: Props) => {
  const [page, setPage] = useState(1);
  const paginated = useRef<Category[][]>([]);

  const ths = (
    <Table.Tr bg='#EEE' className={styles.categoryHeadrow}>
      <Table.Th>Image</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Items in this category</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const tbs = useMemo(() => {
    paginated.current = chunk(categories, 8);

    return paginated.current[page - 1].map((item, index) => (
      <CategoryLine key={index} {...item} />
    ));
  }, [categories, page]);

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

        {paginated.current.length > 1 && <PaginationBar
          total={paginated.current.length}
          value={page}
          onChange={setPage}
        />}
      </div>
    </>
  );
};
