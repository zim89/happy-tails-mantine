import { Button } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import axios, { AxiosError } from "axios";

import { PostFormContext } from "@/shared/lib/context";
import { UnsavedChangesContext } from "@/shared/lib/context";
import { useCreatePostMutation } from "@/shared/api/postApi";

type Props = {
    editor: Editor;
}
export const Header = ({ editor }: Props) => {
    const { form, defaultValues } = useContext(PostFormContext);
    const { update: setUnsavedState } = useContext(UnsavedChangesContext);
    const [dispatch] = useCreatePostMutation();

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
            
            let posterImgSrc = "";

            try {
                const res = await axios.post('https://api.imgur.com/3/image/', params, {
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
                    'Content-Type': 'multipart/form-data',
                  },
                });

                posterImgSrc = res.data.data.link;
            } catch (err) {
                if (err instanceof AxiosError) {
                    form.setFieldError("image", err.message);
                    console.log(err);
                }
            }

            await dispatch({ authorName: author || "Happy Tails Admin", content, title, posterImgSrc, hero: isHero }).unwrap();
            setIsEdited(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex items-center justify-between mb-8'>
            <hgroup>
                <h2 className='mr-1 text-[32px]/[38.4px] font-black'>
                    Blog post
                </h2>
                <p>Сreating and publishing engaging content for our audience.</p>
            </hgroup>
            {isEdited && (
                <div className='flex gap-3'>
                    <Button
                        classNames={{
                            root: 'text-black border rounded-[2px] border-[#C8C8C8] py-[10px] px-8',
                        }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        classNames={{
                            root: 'rounded-[2px] bg-black px-8 py-[10px] text-white'
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            )}
        </div>
    );
};