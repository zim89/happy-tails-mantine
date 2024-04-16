'use client';
import { Button, Table } from '@mantine/core';
import { Mail, Clock3, Banknote, Package, Edit2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import Image from 'next/image';

import { CustomBadge } from '@/components/Badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import mock from '@/modules/OrderTable/mock.json';
import noImage from '@/assets/icons/no-image.512x512.png';

const tax = 1.49;
const discountValue = 5;
const expressShipping = 20;
const standardShipping = 10;

export default function Page() {
  const { id } = useParams();
  const order = mock.content.find((order) => order.number.toLowerCase() === id);

  if (!order) return null;

  const shipping =
    order.shippingMethod === 'Standard' ? standardShipping : expressShipping;
  const discount = order.discountCode ? discountValue : 0;
  const total =
    order.orderProductDTOList.reduce(
      (total, product) =>
        total + (product.productPrice * product.count + tax - discount),
      0
    ) + shipping;

  return (
    <>
      <div className='mb-8'>
        <Breadcrumbs
          crumbs={[
            { href: '/admin/', text: 'Admin' },
            { href: '/admin/orders', text: 'Order' },
            { text: 'Details' },
          ]}
        />
        {/* Details header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-[32px] font-bold'>Order #{order?.number}</h1>
            <div className='flex items-center gap-1'>
              <span className='whitespace-pre'>
                {dayjs(order.createdDate).format('MMM DD, YYYY HH:mm:ss A')}
              </span>
              <CustomBadge color={order.orderStatus.toLowerCase()} name={order.orderStatus} />
            </div>
          </div>
          <Button
            classNames={{
              root: 'border-[1px] border-[#EEEEEE] ml-auto mr-3 text-black',
            }}
          >
            <Mail size={20} color='black' className='mr-2' />
            Resend order confirmation email
          </Button>
          <Button classNames={{ root: 'bg-black' }}>
            <Clock3 size={20} className='mr-2' />
            History
          </Button>
        </div>
        {/* Details header */}
        {/* Order details */}
        <section className='mt-8 overflow-hidden rounded-[4px] border-[1px] border-[#EEE] bg-white font-bold'>
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
                thead: 'bg-[#EEE] uppercase text-xs font-bold text-[#787878]',
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
              {order.orderProductDTOList.map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>
                    <Image
                      src={noImage.src}
                      width={50}
                      height={50}
                      alt={product.productName}
                    />
                  </Table.Td>
                  <Table.Td>{product.productName}</Table.Td>
                  <Table.Td>${product.productPrice}</Table.Td>
                  <Table.Td>
                    {order.discountCode ? `$ ${discount}` : 'None'}
                  </Table.Td>
                  <Table.Td>{product.count}</Table.Td>
                  <Table.Td>${product.productPrice * product.count}</Table.Td>
                  <Table.Td>${tax}</Table.Td>
                  {/* If there is a discount code, cut off subtotal by 10 percent */}
                  <Table.Td>
                    $
                    {product.productPrice * product.count -
                      (order.discountCode ? discount : 0) +
                      tax}
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
            <div className='flex-1 border-x-[1px] border-[#EEE] p-3 text-center'>
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
        {/* Order details */}
        <section className='mt-8 grid grid-cols-3 gap-6'>
          {/* Shipping details */}
          <div className='col-span-2 rounded-[4px] border-[1px] border-[#EEE] bg-white'>
            <div className='flex px-4 py-[22px] items-center justify-between'>
              <h2 className='text-xl font-bold'>
                Shipping details
              </h2>
              <Button classNames={{ root: 'border-[1px] border-[#C8C8C8] w-[36px] h-[36px] p-0' }}>
                <Edit2 size={16} color="black"/>
              </Button>
            </div>

            <div className='flex border-t-[1px] border-[#EEE]'>
              <p className='flex w-52 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
                <Banknote width={16} />
                <span>Billing address</span>
              </p>
              <p className='flex items-center text-ellipsis px-4 text-sm'>
                {order.shippingAddress}
              </p>
            </div>
            <div className='flex border-y-[1px] border-[#EEE]'>
              <p className='flex w-52 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
                <Banknote width={16} />
                <span>Shipping address</span>
              </p>
              <p className='flex items-center text-ellipsis px-4 text-sm'>
                {order.shippingAddress}
              </p>
            </div>
            <div className='flex'>
              <p className='flex w-52 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
                <Package width={16} />
                <span>Shipment method</span>
              </p>
              <p className='flex items-center px-4 text-sm'>
                {order.shippingMethod}
              </p>
            </div>
          </div>

          {/* Client details */}
          <div className='rounded-[4px] border-[1px] border-[#EEE] bg-white'>
            <div className='flex items-center justify-between'>
              <h2 className='p-4 pb-[22px] text-xl font-bold'>
                Client details
              </h2>
              <p>Customer since ...</p>
            </div>

            <div className='flex border-t-[1px] border-[#EEE]'>
              <p className='flex w-28 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
                <Banknote width={16} />
                <span>Name</span>
              </p>
              <p className='flex items-center text-ellipsis px-4 text-sm'>
                Anna Bill
              </p>
            </div>
            <div className='flex border-y-[1px] border-[#EEE]'>
              <p className='flex w-28 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
                <Banknote width={16} />
                <span>Email</span>
              </p>
              <p className='flex items-center px-4 text-sm'>
                anna.bill@gmail.com
              </p>
            </div>
            <div className='flex'>
              <p className='flex w-28 items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
                <Package width={16} />
                <span>Phone</span>
              </p>
              <p className='flex items-center px-4 text-sm'>+44892147896</p>
            </div>
          </div>
          {/* Comment section */}
          <div className='col-span-2 rounded-[4px] border-[1px] border-[#EEE] bg-white'>
            <div className='flex px-4 py-[22px] items-center justify-between border-b-[1px] border-[#EEE]'>
              <h2 className='text-xl font-bold'>
                Comments
              </h2>
              <Button classNames={{ root: 'border-[1px] border-[#C8C8C8] w-[36px] h-[36px] p-0' }}>
                <Edit2 size={16} color="black"/>
              </Button>
            </div>
            <p className='p-3'></p>
          </div>
        </section>
      </div>
    </>
  );
}
