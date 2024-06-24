import { Dispatch, SetStateAction, createContext, useState } from 'react';

type AdminPanelContext = {
  openedLink: string;
  update: Dispatch<SetStateAction<AdminPanelContext>>;
};

const defaultValue: AdminPanelContext = {
  openedLink: '/admin/',
  update: () => {},
};

export const AdminPanelContext = createContext<AdminPanelContext>(defaultValue);

type Props = {
  children: React.ReactNode;
};
export const AdminPanelProvider = ({ children }: Props) => {
  const [values, setValues] = useState(defaultValue);

  return (
    <AdminPanelContext.Provider value={{ ...values, update: setValues }}>
      {children}
    </AdminPanelContext.Provider>
  );
};
