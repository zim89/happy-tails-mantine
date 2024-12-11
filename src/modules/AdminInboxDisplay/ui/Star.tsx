import { Loader, UnstyledButton } from '@mantine/core';
import { LucideStar } from 'lucide-react';
import { useState } from 'react';

import { useToggleStarredMutation } from '@/shared/api/feedbackApi';
import { handleDispatchError } from '@/shared/lib/helpers';

export const Star = ({ id, starred }: { id: number; starred: boolean }) => {
  const [toggleStarred] = useToggleStarredMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStarred = async (id: number) => {
    try {
      setIsLoading(true);
      await toggleStarred(id).unwrap();
    } catch (err) {
      handleDispatchError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UnstyledButton onClick={() => handleToggleStarred(id)}>
      {isLoading ? (
        <Loader size={16} color='black' />
      ) : (
        <LucideStar
          stroke={starred ? '#FBBC04' : 'black'}
          fill={starred ? '#FBBC04' : 'none'}
          size={16}
        />
      )}
    </UnstyledButton>
  );
};
