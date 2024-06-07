import Image from 'next/image';
import { TeamMember as TTeamMember } from '../lib/data';

type Props = TTeamMember;

export const TeamMember = ({
  avatar,
  desc,
  name,
  occupation,
  links,
}: Props) => {
  return (
    <div className='text[#fafafa]'>
      <div>
        <Image src={avatar} alt={`${name}: ${desc}`} />
      </div>
      <hgroup>
        <h4>{name}</h4>
        <p>{occupation}</p>
      </hgroup>
      <p>{desc}</p>
      {links.length > 0 && (
        <ul className='flex gap-4'>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.icon}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
