import Link from 'next/link';

type CategoryBadgeProps = {
  path: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
};

export default function CategoryBadge({
  path,
  name,
  position,
}: CategoryBadgeProps) {

  return (
    <Link
      style={
        {
          top: position.y,
          left: position.x
        }
      }
      className='group absolute left-[--x] top-[--y] flex rounded-full bg-brand-grey-100/60 disabled:opacity-60'
      href={path}
    >
      <div className='absolute inset-1 size-7 rounded-full bg-orange-300 group-hover:animate-ping'></div>
      <div className='relative mr-3 flex size-9 items-center justify-center rounded-full bg-brand-orange-400 group-active:bg-brand-orange-500 group-disabled:bg-gray-500'>
        <div className='size-5 bg-white [mask-image:url(https://i.imgur.com/4FsWarQ.png)] [mask-size:contain]'></div>
      </div>
      <p className='py-[7px] pr-6 text-lg/5'>{name}</p>
    </Link>
  );
}
