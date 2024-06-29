import { Dispatch, SetStateAction, createContext, useState } from 'react';

type UnsavedChangesContext = {
  unsavedChanges: boolean;
  update: Dispatch<SetStateAction<UnsavedChangesContext>>;
};

const defaultUnsavedChanges: UnsavedChangesContext = {
  unsavedChanges: false,
  update: () => {},
};

export const UnsavedChangesContext = createContext<UnsavedChangesContext>(
  defaultUnsavedChanges
);

type UnsavedChangesProviderProps = {
  children: React.ReactNode;
};

export const UnsavedChangesProvider = ({
  children,
}: UnsavedChangesProviderProps) => {
  const [value, setValue] = useState(defaultUnsavedChanges);

  return (
    <UnsavedChangesContext.Provider value={{ ...value, update: setValue }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
};
