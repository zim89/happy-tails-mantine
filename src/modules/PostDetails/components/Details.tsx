import { useContext } from "react";
import { UnstyledButton, Checkbox } from "@mantine/core";
import { Eye, Trash2, FolderDown } from "lucide-react";

import { PostFormContext } from "@/shared/lib/context";

import classes from "../classes.module.css";
import { Post } from "@/shared/api/postApi";
import { cn } from "@/shared/lib/utils";

type Props = {
    post: Post;
}

export const Details = ({ post }: Props) => {
    const { form } = useContext(PostFormContext);

    // Checked param doesn't track whether the form was cleared or not (form.reset()); see @/modules/PostDetails/components/Header.tsx - handleCancel function
    const { checked: omitted, value, ...rest } = form.getInputProps("isHero");
    
    return (
        <div className="bg-white border border-[#C8C8C8] rounded mb-8">
            <p className={classes.auxiliaryHeading}>Details</p>
            <Checkbox color="black" label={"Assign as the main article"} checked={value} {...rest} classNames={{
                root: cn('group py-6 px-4 bg-[#EEE]', post.postStatus === "DRAFT" && "mb-8"),
                body: 'checkbox-body',
                inner: 'checkbox-inner',
                input: 'checkbox-input',
                label: 'checkbox-label font-bold',
            }} />
            {post.postStatus !== "DRAFT" && <div className="flex flex-col items-start gap-4 px-4 py-6">
                {post.postStatus === "PUBLISHED" && (
                    <>
                        <UnstyledButton className="inline-flex gap-2 items-center text-black text-sm outline-none p-0"><Eye size={16} />View the page</UnstyledButton>
                        <UnstyledButton className="inline-flex gap-2 items-center text-black text-sm outline-none p-0"><FolderDown size={16} />Add to archive</UnstyledButton>
                    </>
                )}
                <UnstyledButton className="inline-flex gap-2 items-center text-black text-sm outline-none p-0"><Trash2 size={16} /> Delete article</UnstyledButton>
            </div>}
        </div>
    );
}