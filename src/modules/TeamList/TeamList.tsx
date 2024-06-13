import { TeamMember } from './components/TeamMember';
import { team } from './lib/data';

export default function TeamList() {
  return (
    <>
      <hgroup className='mx-5 mb-14 text-center'>
        <h3 className='mb-4 text-[32px]/[38px] uppercase'>Meet our team</h3>
        <p className='font-light leading-6'>
          Meet the minds behind this site. Get to know the individuals who
          brought it to life.
        </p>
      </hgroup>
      <div className='mb-10 grid grid-cols-1 gap-4 px-5 md:mb-12 md:grid-cols-2 md:gap-y-6 lg:md:gap-x-6 lg:grid-cols-4'>
        {team.map((tm, index) => (
          <TeamMember key={index} {...tm} />
        ))}
      </div>
    </>
  );
}
