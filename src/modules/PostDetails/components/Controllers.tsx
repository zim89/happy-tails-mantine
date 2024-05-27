"use client"

import { useContext } from "react";
import { useRouter } from "next/navigation";

import Controls from "@/components/Controls";
import { useChangePostStatusMutation, useUpdatePostMutation } from "@/shared/api/postApi";
import { PostFormContext } from "@/shared/lib/context";
import { publishImage } from "@/shared/lib/requests";
import { isAxiosQueryError, isErrorDataString } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { KEYS } from "@/shared/constants/localStorageKeys";

type PublishedControllerProps = {
    handleCancel: () => void;
    refetch: () => void;
    setNotification: (type: "Success" | "Failed", text?: string) => void;
}

export const PublishedController = ({ refetch, handleCancel, setNotification }: PublishedControllerProps) => {
    const { form } = useContext(PostFormContext);
    const [dispatch] = useUpdatePostMutation();

    const handleSave = async () => {
        form.validate();
        if (!form.isValid()) return;

        try {
            const { id, author, content, image, title, isHero } = form.values;
            let posterImgSrc = typeof image === "string" ? image : "";

            if (form.isDirty("image") && image) {
                try {
                    posterImgSrc = await publishImage(image, `Post poster for: ${form.values.title}`);
                } catch (err) {
                    if (err instanceof AxiosError) {
                        form.setFieldError("image", err.message);
                        throw err;
                    }
                }
            }

            await dispatch({ id: id.toString(), authorName: author, content, title, posterImgSrc, hero: isHero }).unwrap();
            refetch();
            setNotification("Success", "Post has been saved!")
        } catch (err) {
            if (isAxiosQueryError(err)) {
                console.error(err);
                setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
            }
        }
    };

    return (
        <Controls>
            {({ DarkButton, LightButton }) => <>
                <LightButton handler={handleCancel}>
                    Cancel
                </LightButton>
                <DarkButton handler={handleSave}>
                    Save
                </DarkButton>
            </>}
        </Controls>
    );
}

type ArchivedControllerProps = {
    postId: number;
    refetch: () => void;
    setNotification: (type: "Success" | "Failed", text?: string) => void;
}

export const ArchivedController = ({ postId, refetch, setNotification }: ArchivedControllerProps) => {
    const [dispatch] = useChangePostStatusMutation();

    const handler = async (id: number, status: "DRAFT" | "PUBLISHED") => {
        try {
            await dispatch({ id, status }).unwrap();
            refetch();
            setNotification('Success', `The post has been ${status === "DRAFT" ? "placed in drafts!" : "published!"}`);
        } catch (err) {
            if (isAxiosQueryError(err)) {
                console.error(err);
                setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
            }
        }
    }

    return (
        <Controls>
            {({ DarkButton, LightButton }) => <>
                <LightButton handler={handler.bind(null, postId, "DRAFT")}>
                    Save as a draft
                </LightButton>
                <DarkButton handler={handler.bind(null, postId, "PUBLISHED")}>
                    Publish
                </DarkButton>
            </>}
        </Controls>
    );
}

type DraftControllerProps = {
    postId: number;
    setNotification: (type: "Success" | "Failed", text?: string) => void;
    refetch: () => void;
}

export const DraftController = ({ postId, setNotification, refetch }: DraftControllerProps) => {
    const { form } = useContext(PostFormContext);
    const [dispatch] = useUpdatePostMutation();
    const [changeStatus] = useChangePostStatusMutation();
    const router = useRouter();

    const save = async () => {
        form.validate();
        if (!form.isValid()) return;

        try {
            const { id, author, content, image, title, isHero } = form.values;
            let posterImgSrc = typeof image === "string" ? image : "";

            if (form.isDirty("image") && image) {
                posterImgSrc = await publishImage(image, `Post poster for: ${form.values.title}`);
            }

            await dispatch({ id: id.toString(), authorName: author, content, title, posterImgSrc, hero: isHero }).unwrap();
            setNotification("Success", "The post has been saved!");
            refetch();
        } catch (err) {
            if (isAxiosQueryError(err)) {
                console.error(err);
                setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
            }
        }
    }

    const publish = async () => {
        try {
            await save();
            await changeStatus({ id: postId, status: "PUBLISHED" }).unwrap();
            setNotification("Success", "The post has been published!");
            refetch();
        } catch (err) {
            if (isAxiosQueryError(err)) {
                console.error(err);
                setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
            }
        }
    }

    return (
        <Controls>
            {({ DarkButton, LightButton, PreviewButton }) => <>
                <PreviewButton handler={() => { 
                    localStorage.setItem(KEYS["TEMP_PREVIEW"], JSON.stringify(form.values));
                    router.push(`/admin/blogs/${postId}/preview`);
                }} />
                <LightButton handler={async () => {
                    await save();
                    router.push("/admin/blogs");
                }}>
                    Save and exit
                </LightButton>
                <DarkButton handler={publish}>
                    Publish
                </DarkButton>
            </>}
        </Controls>
    );
}