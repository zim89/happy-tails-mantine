import Checkbox from '@/components/Checkbox';
import { FilterTypes } from '../lib/data';

type Props = {
  name: FilterTypes;
  color: string;
  additionalColor: string;
  content: string;
  checked: boolean;
  label: string;
  setChecked: (param: FilterTypes) => void;
};

export const Filter = ({
  name,
  color,
  content,
  additionalColor,
  checked,
  label,
  setChecked,
}: Props) => {
  return (
    <div
      className='flex w-full max-w-[200px] flex-col px-3 pb-4 pt-3 transition-colors'
      style={{
        backgroundColor: checked ? color : '#FDFDFD',
        borderRight: !checked ? '2px solid #EEE' : '',
      }}
    >
      <Checkbox
        checked={checked}
        onChange={setChecked.bind(null, name)}
        label={label}
        color={additionalColor}
        styles={{
          label: {
            color: (checked && additionalColor) || 'black',
            fontSize: '16px',
            paddingLeft: '8px',
          },
        }}
        classNames={{
          input: 'cursor-pointer',
          root: 'mb-3',
        }}
      />
      <span
        className='mt-auto text-2xl font-bold'
        style={{ color: (checked && additionalColor) || 'black' }}
      >
        {content}
      </span>
    </div>
  );
};
