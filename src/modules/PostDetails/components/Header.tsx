import { useContext, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";

import { PostFormContext } from "@/shared/lib/context";
import { UnsavedChangesContext } from "@/shared/lib/context";
import { Post } from "@/shared/api/postApi";
import { formatDate } from "@/shared/lib/helpers";
import { CustomBadge } from "@/components/Badge";
import { ArchivedController, DraftController, PublishedController } from "./Controllers";
import { AlertTriangle, Check } from "lucide-react";
import { useNotification } from "@/shared/hooks/useNotification";
import Notify from "@/components/Notify";

type Props = {
    editor: Editor;
    post: Post & { refetch: () => void; };
}
export const Header = ({ editor, post }: Props) => {
    const { form, defaultValues } = useContext(PostFormContext);
    const { update: setUnsavedState } = useContext(UnsavedChangesContext);
    const [setNotification, { props, clear }] = useNotification({
        failed: {
            color: "transparent",
            icon: <AlertTriangle size={24} fill='#DC362E' />,
            text: 'Post update failed!',
        },
        success: {
            color: '#389B48',
            icon: <Check size={24} />,
            text: 'Post update succeeded!',
        },
    });

    const [isEdited, setIsEdited] = useState(false);
    const editorContent = editor?.getHTML();

    useEffect(() => {
        // I forced to compare editor's text to the default value because whenever I put something or clear in the editor, it wraps the text in <p> tag, so it's always dirty
        const res = form.isDirty();
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
        <>
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
                    {isEdited && post.postStatus === "PUBLISHED" && <PublishedController setNotification={setNotification} refetch={() => {
                        post.refetch();
                        form.resetDirty();
                    }} handleCancel={handleCancel} />}
                    {isEdited && post.postStatus === "ARCHIVED" && <ArchivedController setNotification={setNotification} postId={post.id} refetch={() => {
                        post.refetch();
                        form.resetDirty();
                    }} />}
                    {post.postStatus === "DRAFT" && <DraftController setNotification={setNotification} postId={post.id} handlePreview={() => { }} refetch={() => {
                        post.refetch();
                    }} />}
                </div>
            </div>
            <Notify {...props} onClose={clear} />
        </>
    );
};