import Link from 'next/link';

import mock from '@/modules/OrderTable/mock.json';
import { OrderTabs } from '../components/OrderTabs';
import classes from '../styles.module.css';
import { Button } from '@mantine/core';
import { cn } from '@/shared/lib/utils';

function OrderPage() {
  return (
    <>
      {/* <h1 className='heading text-center hidden lg:block'>Order History</h1> */}
      {mock.content.length > 0 ? (
        <OrderTabs orders={mock.content} />
      ) : (
        <div className={classes.box}>
          <hgroup>
            <h1 className={cn(classes.boxHeading, "text-2xl md:whitespace-pre")}>
              Your Order History is Currently Empty, <span className="text-[#925816]">Start Shopping now</span>
            </h1>
            <p className={classes.boxParagraph}>
              Your Order History keeps track of all your purchases, making it
              easy to view, manage, and repurchase your favorite items. Once you
              start shopping with us, your orders will appear here, complete
              with all the details you need. Start exploring our wide range of
              products and find something that catches your eye!
            </p>
          </hgroup>
          <Button classNames={{ root: 'bg-black font-bold mb-8' }}><Link href="/products">Continue shopping</Link></Button>
        </div>
      )}
    </>
  );
}

export default OrderPage;
