'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button, Table } from '@mantine/core';
import { PlusCircle } from "lucide-react"
import { useDisclosure } from '@mantine/hooks';
import Image from "next/image";

import Modal from "@/components/ModalWindow";

import styles from './category.module.css';

type Category = {
  image: string;
  name: string;
  itemsCount: number;
};

const mockData: Category[] = [
  {
    image: '/static/icons/categories/clothing.svg',
    name: 'Clothing',
    itemsCount: 0,
  },
  {
    image: '/static/icons/categories/leads.svg',
    name: 'Leads&harnesses',
    itemsCount: 100,
  },
  {
    image: '/static/icons/categories/collars.svg',
    name: 'Collars',
    itemsCount: 21457,
  },
  { image: '/static/icons/categories/toys.svg', name: 'Toys', itemsCount: 22 },
  {
    image: '/static/icons/categories/furniture.svg',
    name: 'Furniture',
    itemsCount: 7879654,
  },
  {
    image: '/static/icons/categories/care.svg',
    name: 'Care',
    itemsCount: 7777,
  },
];

const CategoryLine = ({ image, itemsCount, name }: Category) => (
  <Table.Tr className='text-[#161616]'>
    <Table.Td>
      {/* Fix: width/height: auto to maintain ratio of Image frames */} 
      <Image src={image} width={42} height={42} style={{ width: "auto", height: "auto" }} alt={name} />
    </Table.Td>
    <Table.Td>{name}</Table.Td>
    <Table.Td align='left'>{itemsCount}</Table.Td>
    <Table.Td py={0}>
      <Button className={styles.actionButton}>Edit</Button>
      <Button className={styles.actionButton}>Delete</Button>
    </Table.Td>
  </Table.Tr>
);

export default function CategoryPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const ths = (
    <Table.Tr
      bg='#EEE'
      className='text-xs uppercase leading-[15px] text-[#787878]'
    >
      <Table.Th>Image</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Items in this category</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const tbs = mockData.map((cat, index) => <CategoryLine key={index} {...cat} />);

  return (
    <div className='py-2'>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Admin' }, { text: 'category' }]}
      />
      <div className='flex justify-between items-center'>
        <hgroup>
          <h2 className='mb-2 text-[1.75rem]/[normal] lg:text-4xl/[normal]'>
            Category
          </h2>
          <p>Manage your product category</p>
        </hgroup>
        <Button leftSection={<PlusCircle size={20}/>} onClick={open} className='bg-black'>Add category</Button>
      </div>
      <div className='mt-6'>
        <p className='border-[1px] border-[#EEE] p-4 text-end font-bold'>
          Products Catalog
        </p>
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

      <Modal opened={opened} styles={{
        header: { display: "none" },
        body: { padding: "16px 24px" }
      }} onChange={() => {}} onClose={close}>
        <div>
          <div className="flex items-center justify-between">
          <h2 className="py-6 text-[32px] leading-9 font-bold">Add Category</h2>
          <span onClick={close}>X</span>
          </div>
          <div className='border-2 border-[#464646] border-t-0'/>
        </div>
      </Modal>
    </div>
  );
}
