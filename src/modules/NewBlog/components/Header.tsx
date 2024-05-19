"use client";

import { UnstyledButton } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { PostFormContext } from "@/shared/lib/context";
import { UnsavedChangesContext } from "@/shared/lib/context";
import { useCreatePostMutation } from "@/shared/api/postApi";

import thumbnail from "@/assets/images/categories-dog.png";
import { useNotification } from "@/shared/hooks/useNotification";
import { AlertTriangle, Check } from "lucide-react";
import Notify from "@/components/Notify";
import { isAxiosQueryError, isErrorDataString } from "@/shared/lib/helpers";

type Props = {
    editor: Editor;
}
export const Header = ({ editor }: Props) => {
    const { form, defaultValues } = useContext(PostFormContext);
    const { update: setUnsavedState } = useContext(UnsavedChangesContext);
    const [dispatch] = useCreatePostMutation();
    const router = useRouter();
    const [setNotification, { props, clear }] = useNotification({
        failed: {
            color: "transparent",
            icon: <AlertTriangle size={24} fill='#DC362E' />,
            text: 'post creation failed!',
        },
        success: {
            color: '#389B48',
            icon: <Check size={24} />,
            text: 'Post creation succeeded!',
        },
    });

    const [isEdited, setIsEdited] = useState(false);
    const editorContent = editor?.getHTML();

    // Keep in my mind, whenever you put or clear something in the editor, it wraps the text in <p> tag, so it's always considered to be dirty as defaultValues.content is a plain text node
    const checkIsFormDirty = () => {
        // First, check if the form itself reports being dirty using its isDirty method
        if (!form.isDirty()) return false; // If the form is not dirty, immediately return false

        // Compare the current text in the editor with the default content value
        const isContentSame = editorContent === defaultValues.content;

        // Check if specific form fields ('image', 'isHero', 'title') are not dirty
        const isOtherFieldsNotDirty = !form.isDirty("image") && !form.isDirty("isHero") && !form.isDirty("title");

        // The form is considered not dirty if the content is the same as the default
        // and none of the specified fields are dirty
        // If both conditions are true, !(true && true) => false, meaning the form is not dirty
        // If any condition is false, it means there's a difference or a dirty field, hence the form is dirty
        return !(isContentSame && isOtherFieldsNotDirty);
    };

    useEffect(() => {
        // I forced to compare editor's text to the default value because whenever I put something or clear in the editor, it wraps the text in <p> tag, so it's always dirty
        const res = checkIsFormDirty();
        setIsEdited(res);
        setUnsavedState(prev => ({ ...prev, unsavedChanges: res }));
    }, [editorContent, form, defaultValues.content])

    const handleCancel = () => {
        // Roll back to the initial state
        editor.commands.setContent(defaultValues.content);
        form.reset();
        setIsEdited(false);
    }

    const handleSave = async () => {
        form.validate();
        if (!form.isValid()) return;

        try {

            const { author, content, image, title, isHero } = form.values;

            const params = new FormData();
            params.append('image', image!);
            params.append('title', `Post poster for: ${form.values.title}`);

            let posterImgSrc = thumbnail.src;
            // let posterImgSrc = "";

            // try {
            //     const res = await axios.post('https://api.imgur.com/3/image/', params, {
            //         headers: {
            //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     });

            //     posterImgSrc = res.data.data.link;
            // } catch (err) {
            //     if (err instanceof AxiosError) {
            //         form.setFieldError("image", err.message);
            //         throw err;
            //     }
            // }

            const { id } = await dispatch({ authorName: author || "Happy Tails Admin", content, title, posterImgSrc, hero: isHero }).unwrap();
            setIsEdited(false);
            router.push(`/admin/blogs/${id}`);
            setNotification("Success");
        } catch (err) {
            if (isAxiosQueryError(err)) {
                console.error(err);
                setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
            }
        }
    };

    return (
        <>
            <div className='md:flex items-center justify-between mb-8'>
                <hgroup>
                    <h2 className='mr-1 text-[32px]/[38.4px] font-black'>
                        Blog post
                    </h2>
                    <p>Сreating and publishing engaging content for our audience.</p>
                </hgroup>
                {isEdited && (
                    <div className='flex gap-3 mt-4 md:mt-0'>
                        <UnstyledButton
                            classNames={{
                                root: 'text-black text-sm font-bold border w-[150px] text-center rounded-[2px] border-[#C8C8C8] border-solid py-[10px]',
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </UnstyledButton>
                        <UnstyledButton
                            classNames={{
                                root: 'rounded-[2px] text-sm font-bold bg-black w-[150px] text-center py-[10px] text-white'
                            }}
                            onClick={handleSave}
                        >
                            Save
                        </UnstyledButton>
                    </div>
                )}
            </div>
            <Notify {...props} onClose={clear} />
        </>
    );
};