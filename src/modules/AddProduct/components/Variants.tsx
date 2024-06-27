import { PlusCircle } from 'lucide-react';
import { UnstyledButton } from '@mantine/core';

import classes from '../classes.module.css';
import { context } from '../lib/utils';
import { SingleVariant } from './SingleVariant';
import { useContext } from 'react';
import Table from './Table';

export const Variants = () => {
  const { variants, setVariants } = useContext(context);

  return (
    <>
      <div className={classes.form} style={{ marginTop: 48 }}>
        <div className='mb-6 flex justify-between border-b border-b-brand-grey-400 py-2'>
          <h3 className='text-xl font-bold'>Variants</h3>
          <UnstyledButton classNames={{ root: 'flex gap-2 items-center' }}>
            <PlusCircle size={20} color='black' />
            <span
              className='text-sm font-bold'
              onClick={() => setVariants((prev) => prev.concat(null))}
            >
              {variants.length >= 1
                ? 'Add another option'
                : 'Add options like size or color'}
            </span>
          </UnstyledButton>
        </div>
        {variants.map((_, index) => (
          <SingleVariant key={index} index={index} setVariants={setVariants} />
        ))}
      </div>
      <Table />
    </>
  );
};
