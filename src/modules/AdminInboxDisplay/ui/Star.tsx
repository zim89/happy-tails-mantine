import { useToggleStarredMutation } from '@/shared/api/feedbackApi';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { Loader, UnstyledButton } from '@mantine/core';
import { LucideStar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const Star = ({ id, starred }: { id: number; starred: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [isStarred, setIsStarred] = useState(starred);
  const [toggleStarred] = useToggleStarredMutation();

  const handleToggleStarred = async (id: number) => {
    try {
      setLoading(true);
      await toggleStarred(id).unwrap();
      setIsStarred(!isStarred);
    } catch (err) {
      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <UnstyledButton>
        <Loader size={16} color='black' />
      </UnstyledButton>
    );
  }

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
