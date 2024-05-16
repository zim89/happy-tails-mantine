import { useForm, UseFormReturnType, isInRange, isNotEmpty } from "@mantine/form";
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { Post } from "../api/postApi";
import { isContentEmptyOrShort } from "./utils";

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

type FormProviderType = {
    form: UseFormReturnType<{
        id: string | number;
        isHero: boolean;
        image: string;
        title: string;
        content: string;
        author: string;
    }, (values: {
        id: string | number;
        isHero: boolean;
        image: string;
        title: string;
        content: string;
        author: string;
    }) => {
        id: string | number;
        isHero: boolean;
        image: string;
        title: string;
        content: string;
        author: string;
    }>;
    defaultValues: {
        id: string | number;
        isHero: boolean;
        image: string;
        title: string;
        content: string;
        author: string;
    };
}

export const PostFormContext = createContext<FormProviderType>({} as FormProviderType);

type FormProviderProps = {
    post?: Post;
    children: React.ReactNode;
}
export const PostFormProvider = ({ children, post }: FormProviderProps) => {
    const defaultValues = {
        id: post?.id || '',
        image: post?.posterImgSrc || '',
        isHero: post?.hero || false,
        title: post?.title || "",
        content: post?.content || "<p></p>",
        author: post?.authorName || ""
    }

    const form = useForm({
        initialValues: defaultValues,
        validate: {
            title: (value) => {
                if (value.trim().length < 20) {
                    return "The title should be descriptive.";
                } else if (value.length > 255) {
                    return "The title is too long.";
                }

                return null;
            },
            content: (value) => {
                // Initially the value equals "" but after editing <p>{content}</p>
                if (!value.trim().length || value === "<p></p>" || isContentEmptyOrShort(value)) {
                    return "The content must be at least 40 symbols long.";
                }

                return null;
            },
            image: isNotEmpty("Post poster is required.")   
        }
    });

    return (
        <PostFormContext.Provider value={{ form, defaultValues }}>
            {children}
        </PostFormContext.Provider>
    );
}