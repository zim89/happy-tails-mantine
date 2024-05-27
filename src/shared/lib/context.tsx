import { useForm, UseFormReturnType, isInRange, isNotEmpty } from "@mantine/form";
import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

import { Post } from "../api/postApi";
import { FontFamily, FontSize, ImageResize, isContentEmptyOrShort } from "./utils";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { StateHistory, useStateHistory, UseStateHistoryHandlers } from "@mantine/hooks";

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
        image: string | File | null;
        title: string;
        content: string;
        author: string;
    }, (values: {
        id: string | number;
        isHero: boolean;
        image: string | File | null;
        title: string;
        content: string;
        author: string;
    }) => {
        id: string | number;
        isHero: boolean;
        image: string | File | null;
        title: string;
        content: string;
        author: string;
    }>;
    defaultValues: {
        id: string | number;
        isHero: boolean;
        image: string | File | null;
        title: string;
        content: string;
        author: string;
    };
    history: StateHistory<{
        id: string | number;
        isHero: boolean;
        image: string | File | null;
        title: string;
        content: string;
        author: string;
    }> & UseStateHistoryHandlers<{
        id: string | number;
        image: string | File | null;
        isHero: boolean;
        title: string;
        content: string;
        author: string;
    }>
}

export const PostFormContext = createContext<FormProviderType>({} as FormProviderType);

type FormProviderProps = {
    post?: Post;
    children: React.ReactNode;
}
export const PostFormProvider = ({ children, post }: FormProviderProps) => {
    const defaultValues = {
        id: post?.id || '',
        image: post?.posterImgSrc || null as string | File | null,
        isHero: post?.hero || false,
        title: post?.title || "",
        content: post?.content || "<p></p>",
        author: post?.authorName || ""
    }

    // It's used for rolling back changes after pre-viewing a post
    const [_, handlers, history] = useStateHistory(defaultValues);

    const titlePattern = /^[a-zA-Z0-9 _,.-]+$/;

    const form = useForm({
        initialValues: defaultValues,
        validate: {
            title: (value) => {
                if (value.trim().length < 2) {
                    return "The title should be descriptive.";
                } else if (value.length > 50) {
                    return "The title is too long.";
                } else if (!titlePattern.test(value)) {
                    return "The title is incorrect";
                }

                return null;
            },
            content: (value) => {
                // Initially the value equals "" but after editing <p>{content}</p>
                if (!value.trim().length || value === "<p></p>" || isContentEmptyOrShort(value)) {
                    return "The content must be reasonable.";
                }

                return null;
            },
            image: isNotEmpty("Post poster is required.")
        }
    });

    return (
        <PostFormContext.Provider value={{ form, defaultValues, history: { ...history, ...handlers } }}>
            {children}
        </PostFormContext.Provider>
    );
}