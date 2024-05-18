import { useContext, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";

import { PostFormContext } from "@/shared/lib/context";
import { UnsavedChangesContext } from "@/shared/lib/context";
import { Post } from "@/shared/api/postApi";
import { formatDate } from "@/shared/lib/helpers";
import { CustomBadge } from "@/components/Badge";
import { ArchivedController, DraftController, PublishedController } from "./Controllers";

type Props = {
    editor: Editor;
    post: Post & { refetch: () => void; };
}
export const Header = ({ editor, post }: Props) => {
    const { form, defaultValues } = useContext(PostFormContext);
    const { update: setUnsavedState } = useContext(UnsavedChangesContext);

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

    return (
        <div className='md:flex items-center justify-between mb-8'>
            <hgroup>
                <h2 className='mr-1 text-[32px]/[38.4px] font-black'>
                    Blog post
                </h2>
                <div className="flex gap-3 items-baseline">
                    <p>{formatDate(post.createdAt, "MMM DD, YYYY, HH:mm:ss A")}</p>
                    <CustomBadge
                        color={post.postStatus.toLowerCase()}
                        name={post.postStatus}
                        palette={{
                            published: '#389B48',
                            draft: '#FBBC04',
                            archived: '#B4B4B4',
                        }}
                    />
                </div>
            </hgroup>
            <div className='flex gap-3 mt-4 md:mt-0'>
                {isEdited && post.postStatus === "PUBLISHED" && <PublishedController onClose={() => setIsEdited(false)} handleCancel={handleCancel} />}
                {isEdited && post.postStatus === "ARCHIVED" && <ArchivedController postId={post.id} refetch={post.refetch}/>}
                {post.postStatus === "DRAFT" && <DraftController handlePreview={() => { }} handleSaveAndExit={() => { }} handlePublish={() => { }} />}
            </div>
        </div>
    );
};