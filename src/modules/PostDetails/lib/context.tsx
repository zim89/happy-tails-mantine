import { createContext } from "react";
import { UseFormReturnType, useForm } from "@mantine/form";
import { Post } from "@/shared/api/postApi";

type ContextType = {
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

export const FormContext = createContext<ContextType>({} as ContextType);

type FormProviderProps = {
    post?: Post;
    children: React.ReactNode;
}
export const FormProvider = ({ children, post }: FormProviderProps) => {
    // TODO: get rid of unnecessary params
    const defaultValues = {
        id: post?.id || '',
        image: post?.posterImgSrc || '',
        isHero: post?.hero || false,
        title: post?.title || "",
        content: post?.content || "",
        author: post?.authorName || ""
    }

    const form = useForm({
        initialValues: defaultValues
    });

    return (
        <FormContext.Provider value={{ form, defaultValues }}>
            {children}
        </FormContext.Provider>
    );
}