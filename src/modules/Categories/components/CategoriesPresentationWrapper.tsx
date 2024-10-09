import { useAuth } from '@/shared/hooks/useAuth';
import { EditableCategoriesPresentation } from './EditableCategoriesPresentation';
import CategoriesPresentation from './CategoriesPresentation';

export const CategoriesPresentationWrapper = () => {
  const { isAdmin } = useAuth();

  return (
    <>
      {isAdmin ? (
        <EditableCategoriesPresentation />
      ) : (
        <CategoriesPresentation />
      )}
    </>
  );
};
