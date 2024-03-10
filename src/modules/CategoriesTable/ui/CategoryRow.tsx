import { Table } from '@mantine/core';
import Image from 'next/image';

import styles from './CategoryRow.module.css';

import UpdateCategory from '@/modules/UpdateCategoryModal/UpdateCategoryModal';
import DeleteCategory from '@/modules/DeleteCategoryModal/DeleteCategoryModal';

import noImage from '@/assets/icons/no-image.512x512.png';
import { Category } from '@/shared/api/categoryApi';

const image = {
  path: noImage.src,
  name: 'No image',
};

export default function CategoryRow(category: Category) {
  return (
    <Table.Tr className={styles.categoryRow}>
      <Table.Td>
        <Image src={noImage.src} width={24} height={24} alt={category.name} />
      </Table.Td>
      <Table.Td>{category.name}</Table.Td>
      <Table.Td>{category.productCount}</Table.Td>
      <Table.Td py={0}>
        <UpdateCategory categoryLine={{ ...category, image }} />
        <DeleteCategory categoryLine={{ ...category }} />
      </Table.Td>
    </Table.Tr>
  );
};
