import { Table } from '@mantine/core';
import Image from 'next/image';

import type { Order } from '@/shared/types/types';

type Props = {
  order: Order;
};

export const ProductTable = ({ order }: Props) => {
  const shipping = order.shippingMethodDTO.price;
  const discount = order.discountAmount;
  const total =
    order.orderProductDTOList.reduce(
      (total, product) =>
        total +
        (product.productPrice * product.count + order.taxAmount - discount),
      0
    ) + shipping;

  return (
    <section className='mt-8 overflow-hidden rounded-[4px] border border-brand-grey-300 bg-white font-bold'>
      <h2 className='p-4 text-xl'>Order details</h2>
      <Table
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
      >
        <Table.Thead
          classNames={{
            thead:
              'bg-brand-grey-300 uppercase text-xs font-bold text-brand-grey-800',
          }}
        >
          <Table.Tr title='Image'>
            <Table.Td classNames={{ td: 'p-4' }}>Image</Table.Td>
            <Table.Td>Name</Table.Td>
            <Table.Td>Price</Table.Td>
            <Table.Td>Discount</Table.Td>
            <Table.Td>Quantity</Table.Td>
            <Table.Td>Subtotal</Table.Td>
            <Table.Td>Tax</Table.Td>
            <Table.Td>Total</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {order.orderProductDTOList.map((product, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <Image
                  src={product.productImagePath}
                  width={50}
                  height={50}
                  alt={product.productName}
                />
              </Table.Td>
              <Table.Td>{product.productName}</Table.Td>
              <Table.Td>${product.productPrice}</Table.Td>
              <Table.Td>
                {order.discountAmount ? `$ ${order.discountAmount}` : 'None'}
              </Table.Td>
              <Table.Td>{product.count}</Table.Td>
              <Table.Td>
                ${(product.productPrice * product.count).toFixed(2)}
              </Table.Td>
              <Table.Td>${order.taxAmount}</Table.Td>
              {/* If there is a discount code, cut off subtotal by 10 percent */}
              <Table.Td>
                $
                {(
                  product.productPrice * product.count -
                  (order.discountAmount ? order.discountAmount : 0) +
                  order.taxAmount
                ).toFixed(2)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <div className='flex'>
        <div className='flex-1 p-3 text-center'>
          <span className='text-xl font-bold'>$ {shipping}</span>
          <p className='text-sm/[21px] font-normal'>Shipping</p>
        </div>
        <div className='flex-1 border-x-[1px] border-brand-grey-300 p-3 text-center'>
          <span className='text-xl font-bold'>
            $ {discount * order.orderProductDTOList.length}
          </span>
          <p className='text-sm/[21px] font-normal'>Discount Total</p>
        </div>
        <div className='flex-1 bg-black p-3 text-center text-white '>
          <span className='text-xl font-bold'>$ {total.toFixed(2)}</span>
          <p className='text-sm/[21px] font-normal'>Order Total</p>
        </div>
      </div>
    </section>
  );
};
