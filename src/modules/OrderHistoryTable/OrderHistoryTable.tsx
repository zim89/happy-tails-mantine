import { useSelectOrders } from '@/shared/hooks/useSelectOrders';
import { Table } from './components/Table';

type Props = {
  email: string;
};

export default function OrderHistoryTable({ email }: Props) {
  const orders = useSelectOrders((state) =>
    state.filter((ord) => ord.email === email)
  );

  return <Table orders={orders} />;
}
