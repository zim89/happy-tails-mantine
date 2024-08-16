'use client';

import { useGetTaxQuery } from '@/shared/api/taxApi';
import Loader from '@/components/Loader/Loader';
import { TaxForm } from './TaxForm';

export const TaxSettingDisplay = () => {
  const { data, isError, isLoading } = useGetTaxQuery();

  if (isError)
    return (
      <p>
        {`Whoops, it should not have happened, our experts are already fixing this.`}
      </p>
    );

  if (isLoading || !data) return <Loader size={64} />;

  return (
    <>
      <TaxForm tax={data} />
    </>
  );
};
