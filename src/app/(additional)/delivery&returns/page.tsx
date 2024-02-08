'use client';
import React, { useState } from 'react';
import { Container, Tabs } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function DeliveryAndReturnsPage() {
  const [activeTab, setActiveTab] = useState<string | null>('shipping');

  return (
    <Container>
      <Breadcrumbs
        crumbs={[{ href: '/', text: 'Home' }, { text: 'Shipping & Returns' }]}
      />

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        classNames={{
          list: 'delivery-tabs-list',
          tab: 'delivery-tabs-tab',
          panel: 'delivery-tabs-panel',
        }}
      >
        <div className='flex flex-col gap-8 md:flex-row md:gap-4 lg:gap-12'>
          <div className='space-y-2 bg-brand-grey-200 px-4 pb-6 pt-4 md:p-4'>
            <div className='border-b border-b-brand-grey-600 px-4 py-2 text-2xl/[1.2] font-bold'>
              <div className='md:hidden'>
                <h2>Delivery</h2>
                <h2>& Returns</h2>
              </div>
              <h2 className='hidden md:block'>Delivery & Returns</h2>
            </div>

            <Tabs.List grow>
              <Tabs.Tab value='shipping'>
                Shipping{' '}
                {activeTab === 'shipping' && (
                  <ChevronRight className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2' />
                )}
              </Tabs.Tab>
              <Tabs.Tab value='check'>
                How do I check the status of my order?
                {activeTab === 'check' && (
                  <ChevronRight className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2' />
                )}
              </Tabs.Tab>
              <Tabs.Tab value='return'>
                Return policy
                {activeTab === 'return' && (
                  <ChevronRight className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2' />
                )}
              </Tabs.Tab>
            </Tabs.List>
          </div>

          <div className='pb-12 text-xl/none lg:pb-[72px]'>
            <Tabs.Panel value='shipping'>
              <h2 className='delivery-title'>Shipping Policy</h2>
              <div className='delivery-content'>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>Shipping</h3>
                  <p className='mb-4'>
                    Orders will be processed and shipped usually within 3-10
                    business days once credit card authorization and
                    verification have been obtained. Order processing and
                    shipping may take longer during holidays and sale periods
                    and may also vary depending on item stock and availability.
                    Custom and personalized orders may take up to 21 days. All
                    customers will receive a confirmation email with tracking
                    information when the order has shipped.
                  </p>
                  <p>
                    We offer domestic expedited shipping options at checkout.
                    Rates will apply.
                  </p>
                </div>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>Holiday Shipping Policy</h3>
                  <p className='mb-4'>
                    U.S Standard Shipping - Order by December 15
                  </p>
                  <p>U.S Fast Shipping - Order by December 20th by noon EST</p>
                </div>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>
                    Domestic & International Shipping Rates
                  </h3>
                  <p className='mb-4'>
                    At this time we only ship to the U.S. and Canada. Shipping
                    is free on all orders.
                  </p>
                  <p>
                    Your order may be subject to import duties and taxes
                    (including VAT), which are incurred once a shipment reaches
                    your destination country. Fenwick Pet Co. is not responsible
                    for these charges if they are applied and are your
                    responsibility as the customer.
                  </p>
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value='check'>
              <h2 className='delivery-title'>
                How do I check the status of my order?
              </h2>
              <p>
                When your order has shipped, you will receive an email
                notification from us which will include a tracking number you
                can use to check its status. Please allow 48 hours for the
                tracking information to become available.
              </p>
            </Tabs.Panel>

            <Tabs.Panel value='return'>
              <h2 className='delivery-title'>Refund policy</h2>
              <div className='delivery-content'>
                <div className='delivery-subcontent'>
                  <p>
                    We have a 30-day return policy, which means you have 30 days
                    after receiving your item to request a return.
                  </p>
                  <p>
                    To be eligible for a return, your item must be in the same
                    condition that you received it, unworn or unused, with tags,
                    and in its original packaging. You’ll also need the receipt
                    or proof of purchase.
                  </p>
                  <p>
                    To initiate a return, reply to your order confirmation email
                    to request which products you would like to return. Our
                    Customer Service team will reach out with next steps. Please
                    note that customers are required to cover return shipping
                    costs.
                  </p>
                </div>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>Damages & Issues</h3>
                  <p>
                    Please inspect your order upon reception and contact us
                    immediately if the item is defective, damaged or if you
                    receive the wrong item, so that we can evaluate the issue
                    and make it right.
                  </p>
                </div>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>
                    Eceptions/Non-retulnable Item
                  </h3>
                  <p>
                    Please note the following exceptions to our return and
                    refund policy:
                  </p>
                  <ul className='delivery-list'>
                    <li>
                      Discounted items are final and cannot be returned or
                      exchanged
                    </li>
                    <li>Returned items must have tags still on</li>
                    <li>
                      Returned items must have no visible signs of wear or use
                    </li>
                  </ul>
                </div>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>Exchanges</h3>
                  <p className='mb-8'>
                    The fastest way to ensure you get what you want is to return
                    the item you have, and once the return is accepted, make a
                    separate purchase for the new item.
                  </p>
                </div>
                <div className='delivery-subcontent'>
                  <h3 className='delivery-subtitle'>Refunds</h3>
                  <p>
                    We will notify you once we’ve received and inspected your
                    return, and let you know if the refund was approved or not.
                    If approved, you’ll be automatically refunded on your
                    original payment method. Please remember it can take some
                    time for your bank or credit card company to process and
                    post the refund too.
                  </p>
                </div>
                <p className='font-bold'>
                  Still have questions? Feel free to contact us at
                  onlinestore.teamch2023@gmail.com and we&apos;ll get back to
                  you as soon as we can.
                </p>
              </div>
            </Tabs.Panel>
          </div>
        </div>
      </Tabs>
    </Container>
  );
}
