import Toolbar from '@/modules/OrderToolbar';
import OrdersList from '@/modules/OrdersList';
import { Order } from '@/shared/types/types';
import { ITEMS_LIMIT_PER_PAGE } from '@/shared/config/appVariables';
import { PaginationStateful } from '@/modules/PaginationBar';

import classes from '../styles.module.css';

type Props = {
  orders: Order[];
};
export const HistoryList = ({ orders }: Props) => {
  return (
    <div className={classes.historyList}>
      <Toolbar />

      <div className='mt-6'>
        <PaginationStateful initial={orders} maxItems={ITEMS_LIMIT_PER_PAGE}>
          {(paginated, Panel) => {
            return (
              <>
                <OrdersList orders={paginated} />
                <div className='mb-6'>{Panel}</div>
              </>
            );
          }}
        </PaginationStateful>
      </div>
    </div>
  );
};
