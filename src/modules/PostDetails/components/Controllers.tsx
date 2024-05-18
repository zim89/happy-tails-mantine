"use client"

import { useContext } from "react";
import { useRouter } from "next/navigation";

import Controls from "@/components/Controls";
import { useChangePostStatusMutation, useUpdatePostMutation } from "@/shared/api/postApi";
import { PostFormContext } from "@/shared/lib/context";
import { publishImage } from "@/shared/lib/requests";

type PublishedControllerProps = {
    handleCancel: () => void;
    refetch: () => void;
}

export const PublishedController = ({ refetch, handleCancel }: PublishedControllerProps) => {
    const { form } = useContext(PostFormContext);
    const [dispatch] = useUpdatePostMutation();

    const handleSave = async () => {
        form.validate();
        if (!form.isValid()) return;

        try {
            const { id, author, content, image, title, isHero } = form.values;
            let posterImgSrc = typeof image === "string" ? image : "";

            if (form.isDirty("image") && image) {
                posterImgSrc = await publishImage(image, `Post poster for: ${form.values.title}`);
            }

            await dispatch({ id: id.toString(), authorName: author, content, title, posterImgSrc, hero: isHero }).unwrap();
            refetch();
        } catch (err) {
            console.log(err);
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
}

export const ArchivedController = ({ postId, refetch }: ArchivedControllerProps) => {
    const [dispatch] = useChangePostStatusMutation();

    const handler = async (id: number, status: "DRAFT" | "PUBLISHED") => {
        try {
            await dispatch({ id, status }).unwrap();
            refetch();
        } catch (err) {
            console.log(err);
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
    handlePreview: () => void;
    refetch: () => void;
}

export const DraftController = ({ postId, handlePreview, refetch }: DraftControllerProps) => {
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
        } catch (err) {
            console.log(err);
        }
    }

    const publish = async () => {
        try {
            await save();
            await changeStatus({ id: postId, status: "PUBLISHED" }).unwrap();
            refetch();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Controls>
            {({ DarkButton, LightButton, PreviewButton }) => <>
                <PreviewButton handler={handlePreview} />
                <LightButton handler={async () => {
                    await save();
                    refetch();
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