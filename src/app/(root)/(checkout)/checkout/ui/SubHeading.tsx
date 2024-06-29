import { cn } from '@/shared/lib/utils';

type Title = 'Delivery Options' | 'Shipping Method' | 'Payment Method';

export default function SubHeading({
  title,
  isCompleted = false,
  setIsCompleted,
}: {
  title: Title;
  withBorder?: boolean;
  isCompleted?: boolean;
  setIsCompleted?: (value: boolean) => void;
}) {
  return (
    <h2 className='mb-4 flex items-baseline justify-between border-b border-b-brand-grey-400 pb-3 text-xl/6 font-bold'>
      {title}
      {isCompleted && (
        <button
          type='button'
          className='relative font-bold after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-secondary'
          onClick={() => (setIsCompleted ? setIsCompleted(false) : null)}
        >
          Edit
        </button>
      )}
    </h2>
  );
}
