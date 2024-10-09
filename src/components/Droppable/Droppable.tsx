import { cn } from '@/shared/lib/utils';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

export function Droppable({ children, id, className }: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={cn(className)}>
      {children}
    </div>
  );
}
