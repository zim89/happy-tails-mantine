import Controls from "@/components/Controls";
import { useChangePostStatusMutation, useUpdatePostMutation } from "@/shared/api/postApi";
import { PostFormContext } from "@/shared/lib/context";
import { publishImage } from "@/shared/lib/requests";
import { useContext } from "react";

type PublishedControllerProps = {
    handleCancel: () => void;
    onClose: () => void;
}
export const PublishedController = ({ onClose, handleCancel }: PublishedControllerProps) => {
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
            onClose();
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
    handlePreview: () => void;
    handleSaveAndExit: () => void;
    handlePublish: () => void;
}

export const DraftController = ({ handlePreview, handleSaveAndExit, handlePublish }: DraftControllerProps) => {
    return (
        <Controls>
            {({ DarkButton, LightButton, PreviewButton }) => <>
                <PreviewButton handler={handlePreview} />
                <LightButton handler={handleSaveAndExit}>
                    Save and exit
                </LightButton>
                <DarkButton handler={handlePublish}>
                    Publish
                </DarkButton>
            </>}
        </Controls>
    );
}