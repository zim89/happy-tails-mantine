import { Button, Table } from '@mantine/core';
import Image from 'next/image';
import { use } from 'react';

import styles from './CategoryRow.module.css';
import { Category } from '../lib/data';

import UpdateCategory from '@/modules/UpdateCategoryModal/UpdateCategoryModal';
import DeleteCategory from '@/modules/DeleteCategoryModal/DeleteCategoryModal';

import noImage from "@/assets/icons/no-image.512x512.png";

const image = {
  path: noImage.src,
  name: "No image"
}

export default ({ id, productCount, name }: Category) => {
  return (
    <Table.Tr className={styles.categoryRow}>
      <Table.Td>
        <Image src={noImage.src} width={24} height={24} alt={name} />
      </Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{productCount}</Table.Td>
      <Table.Td py={0}>
        <UpdateCategory categoryLine={{ id, name, image }} />
        <DeleteCategory categoryLine={{ id, name, image, productCount }}/>
      </Table.Td>
    </Table.Tr>
  );
};
