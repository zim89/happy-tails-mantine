import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

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

  useEffect(() => {
    const beforeunload = (e: BeforeUnloadEvent) => {
      if (value.unsavedChanges) {
        // Invoking event.preventDefault() will trigger a warning dialog when the user closes or navigates the tab
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#examples
        e.preventDefault();
        // Included for legacy support, e.g. Chrome/Edge < 119
        e.returnValue = true;
      }
    };

    window.addEventListener('beforeunload', beforeunload);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  }, [value.unsavedChanges]);

  return (
    <UnsavedChangesContext.Provider value={{ ...value, update: setValue }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
};
