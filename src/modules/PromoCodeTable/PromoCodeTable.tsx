import { useFindManyQuery } from '@/shared/api/discountApi';
import Table from './components/Table';
import Loader from '@/components/Loader/Loader';

export const PromoCodeTable = () => {
  const { data, error, isLoading } = useFindManyQuery();

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't've happened, our experts are already fixing this!"
        }
      </p>
    );

  if (isLoading) {
    return <Loader size={128} />;
  }

  return (
    <div className='mt-8'>
      <Table data={data?.content || []} />
    </div>
  );
};
