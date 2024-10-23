import Image from 'next/image';

import { TeamMember as TTeamMember } from '../lib/data';
import classes from '../classes.module.css';
import { cn } from '@/shared/lib/utils';

type Props = TTeamMember;

export const TeamMember = ({
  avatar,
  avatarStyles,
  cardStyles,
  desc,
  name,
  occupation,
  links,
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center bg-brand-grey-100 px-4 py-6 text-center',
        classes.boxShadow
      )}
      style={cardStyles || {}}
    >
      <div className='relative h-[136px] w-[136px] overflow-hidden rounded-full'>
        <Image
          className='object-cover'
          style={avatarStyles || {}}
          src={avatar}
          alt={`${name}: ${occupation}`}
          fill
          sizes='100%'
        />
      </div>
      <hgroup className='mb-4 mt-6'>
        <h4 className='text-2xl font-bold'>{name}</h4>
        <p className='text-xl font-bold text-brand-orange-400'>{occupation}</p>
      </hgroup>
      <p className='text-sm'>{desc}</p>
      {links.length > 0 && (
        <ul className='mt-auto flex gap-4 pt-5 '>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target='_blank'>
                <Image src={link.icon} width={24} height={24} alt='' />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
