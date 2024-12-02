import { UnstyledButton } from '@mantine/core';
import { LucideStar } from 'lucide-react';
import { useState } from 'react';

import { useToggleStarredMutation } from '@/shared/api/feedbackApi';
import { handleDispatchError } from '@/shared/lib/helpers';

export const Star = ({ id, starred }: { id: number; starred: boolean }) => {
  const [isStarred, setIsStarred] = useState(starred);
  const [toggleStarred] = useToggleStarredMutation();

  const handleToggleStarred = async (id: number) => {
    try {
      setIsStarred(!isStarred);
      await toggleStarred(id).unwrap();
    } catch (err) {
      handleDispatchError(err);
    }
  };

  return (
    <UnstyledButton onClick={() => handleToggleStarred(id)}>
      <LucideStar
        stroke={isStarred ? '#FBBC04' : 'black'}
        fill={isStarred ? '#FBBC04' : 'none'}
        size={16}
      />
    </UnstyledButton>
  );
};
