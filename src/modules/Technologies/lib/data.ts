import figma from '@/assets/icons/additional/Figma.svg';
import docker from '@/assets/icons/additional/Docker.svg';
import nextjs from '@/assets/icons/additional/Nextjs.svg';
import ts from '@/assets/icons/additional/Typescript.svg';
import redux from '@/assets/icons/additional/Redux.svg';
import postgres from '@/assets/icons/additional/PostgreSQL.svg';
import java from '@/assets/icons/additional/Java.svg';
import jira from '@/assets/icons/additional/Jira.svg';

type Technology = {
  id: number;
  image: string;
  alt: string;
};

export const technologies: Technology[] = [
  {
    id: 1,
    image: figma.src,
    alt: 'Figma',
  },
  {
    id: 2,
    image: docker.src,
    alt: 'Docker',
  },
  {
    id: 3,
    image: nextjs.src,
    alt: 'Next.js',
  },
  {
    id: 4,
    image: ts.src,
    alt: 'Typescript',
  },
  {
    id: 5,
    image: redux.src,
    alt: 'Redux',
  },
  {
    id: 6,
    image: postgres.src,
    alt: 'PostgreSQL',
  },
  {
    id: 7,
    image: java.src,
    alt: 'Java',
  },
  {
    id: 8,
    image: jira.src,
    alt: 'Jira',
  },
];
