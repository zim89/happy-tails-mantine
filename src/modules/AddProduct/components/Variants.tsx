import classes from '../classes.module.css';
import { context } from '../lib/utils';
import { SingleVariant } from './SingleVariant';
import { useContext } from 'react';
import Table from './Table';
import { AddVariantModal } from '@/modules/AddVariantModal/AddVariantModal';

export const Variants = () => {
  const { variants, setVariants } = useContext(context);

  return (
    <>
      <div className={classes.form} style={{ marginTop: 48 }}>
        <div className='mb-6 flex justify-between border-b border-b-brand-grey-400 py-2'>
          <h3 className='text-xl font-bold'>Variants</h3>
          <AddVariantModal />
        </div>
        {variants.map((variant, index) => (
          <SingleVariant
            key={index}
            index={index}
            variant={variant}
            setVariants={setVariants}
          />
        ))}
      </div>
      <Table />
    </>
  );
};
