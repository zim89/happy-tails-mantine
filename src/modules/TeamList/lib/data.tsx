import zahrebelna from '@/assets/images/additional/about-us/zahrebelna.png';
import bilyk from '@/assets/images/additional/about-us/bilyk.png';
import honcharenko from '@/assets/images/additional/about-us/honcharenko.png';
import hurska from '@/assets/images/additional/about-us/hurska.png';
import lisova from '@/assets/images/additional/about-us/lisova.png';
import zimnytsia from '@/assets/images/additional/about-us/zimnytsia.png';
import melnyk from '@/assets/images/additional/about-us/melnyk.png';
import vladinov from '@/assets/images/additional/about-us/vladinov.png';

import github from '@/assets/icons/additional/Github.svg';
import behance from '@/assets/icons/additional/Behance.svg';
import linkedIn from '@/assets/icons/additional/LinkedIn.svg';

type TeamLink = {
  href: string;
  icon: React.ReactNode;
};

export type TeamMember = {
  avatar: string;
  name: string;
  occupation: string;
  desc: string;
  links: TeamLink[];
};

export const team: TeamMember[] = [
  {
    avatar: zahrebelna.src,
    name: 'Daria Zahrebelna',
    occupation: 'Project Manager',
    desc: 'I am always up for a challenge, constantly exploring new ways to grow and make every day exciting.',
    links: [
      {
        href: 'https://www.linkedin.com/in/daria-zahrebelna-81aa31218/',
        icon: linkedIn,
      },
    ],
  },
  {
    avatar: melnyk.src,
    name: 'Oleksandr Melnyk',
    occupation: 'Backend Developer',
    desc: 'Motivated backend developer with great knowledge of Java and Spring, also with an understanding of how to make things work',
    links: [
      {
        href: 'https://www.linkedin.com/in/melnyk-alex002/',
        icon: linkedIn,
      },
      {
        href: 'https://github.com/melnyk-alex02',
        icon: github,
      },
    ],
  },
  {
    avatar: bilyk.src,
    name: 'Inesa Bilyk',
    occupation: 'UX/UI Designer',
    desc: 'I specialize in creating designs that blend aesthetics with user-friendly functionality, ensuring the successful achievement of project goals',
    links: [
      {
        href: 'https://www.linkedin.com/in/inesabilyk/',
        icon: linkedIn,
      },
      {
        href: 'https://www.behance.net/b6dff318',
        icon: behance,
      },
    ],
  },
  {
    avatar: hurska.src,
    name: 'Diana Hurska',
    occupation: 'UX/UI Designer',
    desc: 'Responsible for creating user-friendly and visually appealing interfaces for websites and applications to enhance the overall user experience.',
    links: [
      {
        href: 'https://www.linkedin.com/in/diana-hurska-06b064277/',
        icon: linkedIn,
      },
      {
        href: 'https://www.behance.net/d8db8e80',
        icon: behance,
      },
    ],
  },
  {
    avatar: lisova.src,
    name: 'Olena Lisova',
    occupation: 'Manual QA Engineer',
    desc: '"When you step out of your comfort zone, you are stepping into your path of personal growth." — Robert Allen',
    links: [
      {
        href: 'https://www.linkedin.com/in/lisova-olena/',
        icon: linkedIn,
      },
    ],
  },
  {
    avatar: zimnytsia.src,
    name: 'Olexandr Zimnytsia',
    occupation: 'Front-end Developer',
    desc: 'Fullstack developer with 1+ years of experience. I enjoy building sites & apps. My focus is React (Next.js).',
    links: [
      {
        href: 'https://www.linkedin.com/in/olexandr-zimnytsia/',
        icon: linkedIn,
      },
      {
        href: 'https://github.com/zim89',
        icon: github,
      },
    ],
  },
  {
    avatar: honcharenko.src,
    name: 'Dima Honcharenko',
    occupation: 'Front-end Developer',
    desc: 'I turn designs into interactive web applications, bringing ideas to life on the web.',
    links: [
      {
        href: 'https://www.linkedin.com/in/dimahoncharenko-33a9a3218/',
        icon: linkedIn,
      },
      {
        href: 'https://github.com/dimahoncharenko',
        icon: github,
      },
    ],
  },
  {
    avatar: vladinov.src,
    name: 'Vladyslav Vladinov',
    occupation: 'Front-end Developer',
    desc: 'Building performant solutions with nice visuals.',
    links: [
      {
        href: 'https://www.linkedin.com/in/vladyslav-vladinov',
        icon: linkedIn,
      },
      {
        href: 'https://github.com/SalOne22',
        icon: github,
      },
    ],
  },
];
