import Image from 'next/image';

export const FileIcon = ({ text }: { text: string }) => {
  return (
    <div className='relative h-6 w-5'>
      <Image
        src='/images/file-type-bg.png'
        alt='file type image'
        fill
        sizes='100%'
        className='object-cover'
      />
      <div className='absolute bottom-1 left-1/2 flex h-2.5 w-[22px] -translate-x-1/2 items-center justify-center rounded-sm bg-[#C548F1] text-7xl font-bold uppercase text-white'>
        {text}
      </div>
    </div>
  );
};
