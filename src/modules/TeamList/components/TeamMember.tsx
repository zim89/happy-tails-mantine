import Image from 'next/image';

import { TeamMember as TTeamMember } from '../lib/data';
import classes from '../classes.module.css';
import { cn } from '@/shared/lib/utils';

type Props = TTeamMember;

export const TeamMember = ({
  avatar,
  avatarStyles,
  desc,
  name,
  occupation,
  links,
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center bg-[#fafafa] px-4 py-6 text-center',
        classes.boxShadow
      )}
    >
      <div className='relative h-[136px] w-[136px] overflow-hidden rounded-full'>
        <Image
          className='object-cover'
          style={avatarStyles || {}}
          src={avatar}
          alt={`${name}: ${occupation}`}
          layout='fill'
          sizes='100%'
        />
      </div>
      <hgroup className='mb-4 mt-6'>
        <h4 className='text-2xl font-bold'>{name}</h4>
        <p className='text-xl font-bold text-[#F39324]'>{occupation}</p>
      </hgroup>
      <p className='text-sm'>{desc}</p>
      {links.length > 0 && (
        <ul className='mt-auto flex gap-4 pt-5 '>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target='_blank'>
                <Image
                  src={link.icon.src}
                  width={link.icon.width}
                  height={link.icon.height}
                  alt=''
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
