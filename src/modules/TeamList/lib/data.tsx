import { CSSProperties } from 'react';

type TeamLink = {
  href: string;
  icon: string;
};

export type TeamMember = {
  avatar: string;
  avatarStyles?: CSSProperties;
  cardStyles?: CSSProperties;
  name: string;
  occupation: string;
  desc: string;
  links: TeamLink[];
};

export const team: TeamMember[] = [
  {
    avatar: '/images/additional/about-us/zahrebelna.png',
    avatarStyles: {
      objectPosition: '-23px -30px',
      transform: 'scale(3.5)',
    },
    name: 'Daria Zahrebelna',
    occupation: 'Project Manager',
    desc: 'I am always up for a challenge, constantly exploring new ways to grow and make every day exciting.',
    links: [
      {
        href: 'https://www.linkedin.com/in/daria-zahrebelna-81aa31218/',
        icon: '/icons/additional/LinkedIn.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/melnyk.png',
    avatarStyles: {
      transform: 'scale(1.5)',
      objectPosition: '0px -10px',
    },
    name: 'Oleksandr Melnyk',
    occupation: 'Backend Developer',
    desc: 'Motivated backend developer with great knowledge of Java and Spring, also with an understanding of how to make things work',
    links: [
      {
        href: 'https://www.linkedin.com/in/melnyk-alex002/',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://github.com/melnyk-alex02',
        icon: '/icons/additional/Github.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/bilyk.png',
    avatarStyles: {
      transform: 'scale(1.3)',
      objectPosition: '-5px 15px',
    },
    name: 'Inesa Bilyk',
    occupation: 'UX/UI Designer',
    desc: 'I specialize in creating designs that blend aesthetics with user-friendly functionality, ensuring the successful achievement of project goals',
    links: [
      {
        href: 'https://www.linkedin.com/in/inesabilyk/',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://www.behance.net/b6dff318',
        icon: '/icons/additional/Behance.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/hurska.png',
    name: 'Diana Hurska',
    occupation: 'UX/UI Designer',
    desc: 'Responsible for creating user-friendly and visually appealing interfaces for websites and applications to enhance the overall user experience.',
    links: [
      {
        href: 'https://www.linkedin.com/in/diana-hurska-06b064277/',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://www.behance.net/d8db8e80',
        icon: '/icons/additional/Behance.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/lisova.png',
    avatarStyles: {
      objectPosition: 'top',
    },
    name: 'Olena Lisova',
    occupation: 'Manual QA Engineer',
    desc: '"When you step out of your comfort zone, you are stepping into your path of personal growth." — Robert Allen',
    links: [
      {
        href: 'https://www.linkedin.com/in/lisova-olena/',
        icon: '/icons/additional/LinkedIn.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/zimnytsia.png',
    name: 'Olexandr Zimnytsia',
    occupation: 'Front-end Developer',
    desc: 'Fullstack developer with 1+ years of experience. I enjoy building sites & apps. My focus is React (Next.js).',
    links: [
      {
        href: 'https://www.linkedin.com/in/olexandr-zimnytsia/',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://github.com/zim89',
        icon: '/icons/additional/Github.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/honcharenko.png',
    avatarStyles: {
      transform: 'scale(2.2)',
      objectPosition: '-8px -16px',
      filter: 'brightness(1.4)',
    },
    name: 'Dima Honcharenko',
    occupation: 'Front-end Developer',
    desc: 'I turn designs into interactive web applications, bringing ideas to life on the web.',
    links: [
      {
        href: 'https://www.linkedin.com/in/dimahoncharenko-33a9a3218/',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://github.com/dimahoncharenko',
        icon: '/icons/additional/Github.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/vladinov.png',
    avatarStyles: {
      border: '1px solid #C8C8C8',
      borderRadius: '50%',
    },
    name: 'Vladyslav Vladinov',
    occupation: 'Front-end Developer',
    desc: 'Building performant solutions with nice visuals.',
    links: [
      {
        href: 'https://www.linkedin.com/in/vladyslav-vladinov',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://github.com/SalOne22',
        icon: '/icons/additional/Github.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/kliuchka.jpg',
    avatarStyles: {
      border: '1px solid #C8C8C8',
      borderRadius: '50%',
    },

    name: 'Olha Kliuchka',
    occupation: 'Manual QA Engineer',
    desc: 'I strive for innovation and continuous improvement, ensuring our products exceed expectations.',
    links: [
      {
        href: 'https://www.linkedin.com/in/olha-kliuchka-21568b278',
        icon: '/icons/additional/LinkedIn.svg',
      },
    ],
  },
  {
    avatar: '/images/additional/about-us/sitarskiy.png',
    name: 'Andrey Sitarskiy',
    avatarStyles: {
      objectPosition: '0 3px',
      backgroundColor: '#c18383',
    },

    occupation: 'Backend Developer',
    desc: 'I am a backend developer who is skillfully using Java tools to solve current problems.',
    links: [
      {
        href: 'https://www.linkedin.com/in/andrey-sitarskiy-215787250',
        icon: '/icons/additional/LinkedIn.svg',
      },
      {
        href: 'https://github.com/adreysm09',
        icon: '/icons/additional/Github.svg',
      },
    ],
  },
];
