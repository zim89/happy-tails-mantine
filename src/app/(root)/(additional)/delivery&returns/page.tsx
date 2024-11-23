'use client';
import { useState } from 'react';
import { Container, Tabs } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './styles.module.css';

export default function DeliveryAndReturnsPage() {
  const [activeTab, setActiveTab] = useState<string | null>('shipping');

  return (
    <div className={styles.section}>
      <div className='container'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: 'Shipping & Returns' }]}
          classNames={{ root: 'p-0 pt-4' }}
        />

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          classNames={{
            list: styles.tabsList,
            tab: styles.tabItem,
          }}
        >
          <div className={styles.wrap}>
            <div>
              <div className={styles.sidebarTitleWrap}>
                <h1 className='md:hidden'>
                  Delivery <br />& Returns
                </h1>
                <h1 className='hidden md:block'>Delivery & Returns</h1>
              </div>
              <div className={styles.tabListWrap}>
                <Tabs.List grow>
                  <div className={styles.tabListInner}>
                    <Tabs.Tab value='shipping'>
                      Shipping
                      {activeTab === 'shipping' && (
                        <ChevronRight className={styles.tabIcon} />
                      )}
                    </Tabs.Tab>
                    <Tabs.Tab value='check'>
                      How do I check the status of my order?
                      {activeTab === 'check' && (
                        <ChevronRight className={styles.tabIcon} />
                      )}
                    </Tabs.Tab>
                    <Tabs.Tab value='return'>
                      Return policy
                      {activeTab === 'return' && (
                        <ChevronRight className={styles.tabIcon} />
                      )}
                    </Tabs.Tab>
                  </div>
                </Tabs.List>
              </div>
            </div>

            <Tabs.Panel value='shipping'>
              <h2 className={styles.title}>Shipping Policy</h2>
              <div className={styles.panelInner}>
                <div className={styles.panelContent}>
                  <h3>Shipping</h3>
                  <p>
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
                <div className={styles.panelContent}>
                  <h3>Holiday Shipping Policy</h3>
                  <p>U.S Standard Shipping - Order by December 15</p>
                  <p>U.S Fast Shipping - Order by December 20th by noon EST</p>
                </div>
                <div className={styles.panelContent}>
                  <h3>Domestic & International Shipping Rates</h3>
                  <p>
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
              <h2>How do I check the status of my order?</h2>
              <p>
                When your order has shipped, you will receive an email
                notification from us which will include a tracking number you
                can use to check its status. Please allow 48 hours for the
                tracking information to become available.
              </p>
            </Tabs.Panel>

            <Tabs.Panel value='return'>
              <h2>Refund policy</h2>
              <div className={styles.panelInner}>
                <div className={styles.panelContent}>
                  <p>
                    We have a 30-day return policy, which means you have 30 days
                    after receiving your item to request a return.
                  </p>
                  <p>
                    {`To be eligible for a return, your item must be in the same
                    condition that you received it, unworn or unused, with tags,
                    and in its original packaging. You’ll also need the receipt
                    or proof of purchase.`}
                  </p>
                  <p>
                    To initiate a return, reply to your order confirmation email
                    to request which products you would like to return. Our
                    Customer Service team will reach out with next steps. Please
                    note that customers are required to cover return shipping
                    costs.
                  </p>
                </div>
                <div className={styles.panelContent}>
                  <h3>Damages & Issues</h3>
                  <p>
                    Please inspect your order upon reception and contact us
                    immediately if the item is defective, damaged or if you
                    receive the wrong item, so that we can evaluate the issue
                    and make it right.
                  </p>
                </div>
                <div className={styles.panelContent}>
                  <h3>Eceptions/Non-retulnable Item</h3>
                  <p>
                    Please note the following exceptions to our return and
                    refund policy:
                  </p>
                  <ul className={styles.panelList}>
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
                <div className={styles.panelContent}>
                  <h3>Exchanges</h3>
                  <p>
                    The fastest way to ensure you get what you want is to return
                    the item you have, and once the return is accepted, make a
                    separate purchase for the new item.
                  </p>
                </div>
                <div className={styles.panelContent}>
                  <h3>Refunds</h3>
                  <p>
                    {`We will notify you once we’ve received and inspected your
                    return, and let you know if the refund was approved or not.
                    If approved, you’ll be automatically refunded on your
                    original payment method. Please remember it can take some
                    time for your bank or credit card company to process and
                    post the refund too.`}
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
        </Tabs>
      </div>
    </div>
  );
}
