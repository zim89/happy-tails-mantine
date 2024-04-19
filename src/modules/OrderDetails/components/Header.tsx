import dayjs from "dayjs";
import { Button } from "@mantine/core";
import { Clock3, Mail } from "lucide-react";

import { CustomBadge } from '@/components/Badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Order } from "@/shared/types/types";

type Props = {
    order: Order
}

export const Header = ({ order }: Props) => {
    return (
        <>
        <Breadcrumbs
          crumbs={[
            { href: '/admin/', text: 'Admin' },
            { href: '/admin/orders', text: 'Order' },
            { text: 'Details' },
          ]}
        />
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-[32px] font-bold'>Order #{order.number}</h1>
            <div className='flex items-center gap-1'>
              <span className='whitespace-pre'>
                {dayjs(order.createdDate).format('MMM DD, YYYY HH:mm:ss A')}
              </span>
              <CustomBadge
                color={order.orderStatus.toLowerCase()}
                name={order.orderStatus}
              />
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
        </>
    );
}