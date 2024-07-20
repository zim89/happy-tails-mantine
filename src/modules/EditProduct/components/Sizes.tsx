import { UnstyledButton } from '@mantine/core';
import { PlusCircle } from 'lucide-react';
import { useContext } from 'react';

import { context } from '../lib/utils';
import classes from '../classes.module.css';
import { SingleSize } from './SingleSize';

export const Sizes = () => {
  const { setSizes, sizes } = useContext(context);

  return (
    <>
      <div className={classes.form} style={{ marginTop: 48 }}>
        <div className='mb-6 flex items-center justify-between border-b border-b-brand-grey-400 py-2'>
          <h3 className='text-xl font-bold'>Sizes</h3>
          <UnstyledButton
            classNames={{ root: 'ml-auto flex gap-2 items-center' }}
          >
            <PlusCircle size={20} color='black' />
            <span
              className='text-sm font-bold'
              onClick={() =>
                setSizes((prev) =>
                  prev.concat({
                    id: 'init',
                    description: '',
                    size: 'ONE SIZE',
                    quantity: 0,
                  })
                )
              }
            >
              Add another size
            </span>
          </UnstyledButton>
        </div>

        {sizes.map((size, index) => (
          <SingleSize
            size={size}
            index={index}
            key={index}
            setSizes={setSizes}
          />
        ))}
      </div>
    </>
  );
};
