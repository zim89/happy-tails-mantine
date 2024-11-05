'use client';

import { useGetTaxQuery } from '@/shared/api/taxApi';

import { TaxForm } from './TaxForm';
import { TaxSettingSkeleton } from './skeletons/TaxSettingSkeleton';

export const TaxSettingDisplay = () => {
  const { data, isError, isLoading } = useGetTaxQuery();

  if (isError)
    return (
      <p>
        {`Whoops, it should not have happened, our experts are already fixing this.`}
      </p>
    );

  if (isLoading || !data) return <TaxSettingSkeleton />;

  return (
    <>
      <TaxForm tax={data} />
    </>
  );
};
