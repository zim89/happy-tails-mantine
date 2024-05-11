import { createContext, useState, Dispatch, SetStateAction } from "react";

type AdminPanelContext = {
    openedLink: string;
    update: Dispatch<SetStateAction<AdminPanelContext>>
}

const defaultValue: AdminPanelContext = {
    openedLink: "/admin/",
    update: () => { }
}

export const AdminPanelContext = createContext<AdminPanelContext>(defaultValue);

type Props = {
    children: React.ReactNode
}
export const AdminPanelProvider = ({ children }: Props) => {
    const [values, setValues] = useState(defaultValue);

    return (
        <AdminPanelContext.Provider value={{ ...values, update: setValues }}>
            {children}
        </AdminPanelContext.Provider>
    );
}

type UnsavedChangesContext = {
    unsavedChanges: boolean;
    update: Dispatch<SetStateAction<UnsavedChangesContext>>
};

const defaultUnsavedChanges: UnsavedChangesContext = {
    unsavedChanges: false,
    update: () => { }
};

export const UnsavedChangesContext = createContext<UnsavedChangesContext>(defaultUnsavedChanges);

type UnsavedChangesProviderProps = {
    children: React.ReactNode
}

export const UnsavedChangesProvider = ({ children }: UnsavedChangesProviderProps) => {
    const [value, setValue] = useState(defaultUnsavedChanges);

    return (
        <UnsavedChangesContext.Provider value={{ ...value, update: setValue }}>
            {children}
        </UnsavedChangesContext.Provider>
    )
}