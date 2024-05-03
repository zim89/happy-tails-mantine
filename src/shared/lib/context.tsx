import { createContext, useState, Dispatch, SetStateAction } from "react";

type Context = {
    openedLink: string;
    update: Dispatch<SetStateAction<Context>>
}

const defaultValue: Context = {
    openedLink: "/admin/",
    update: () => {}
}

export const AdminPanelContext = createContext<Context>(defaultValue);

type Props = {
    children: React.ReactNode
}
export const AdminPanelProvider = ({ children }: Props) => {
    const [values, setValues] = useState(defaultValue);

    return (
        <AdminPanelContext.Provider value={{...values, update: setValues}}>
            {children}
        </AdminPanelContext.Provider>
    );
}