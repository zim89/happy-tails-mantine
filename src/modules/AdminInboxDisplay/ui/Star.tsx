import { UnstyledButton } from '@mantine/core';
import { LucideStar } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export const Star = ({
  id,
  starred,
  setStarred,
}: {
  id: number;
  starred: boolean;
  setStarred?: Dispatch<SetStateAction<number[]>>;
}) => {
  const isStarred = starred === true;
  //   const star = (id: number) => {
  //     setStarred((prev) => [...prev, id]);
  //   };

  //   const unstar = (id: number) => {
  //     setStarred((prev) => prev.filter((candidate) => candidate !== id));
  //   };

  return (
    <UnstyledButton
    //   onClick={starred ? unstar.bind(null, id) : star.bind(null, id)}
    >
      {isStarred ? (
        <LucideStar stroke='#FBBC04' fill='#FBBC04' size={16} />
      ) : (
        <LucideStar size={16} />
      )}
    </UnstyledButton>
  );
};
