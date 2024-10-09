import { cn } from '@/shared/lib/utils';
import { ClientRect, useDroppable } from '@dnd-kit/core';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

export function Droppable({ children, id, className }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn(className)}>
      {children}
    </div>
  );
}
