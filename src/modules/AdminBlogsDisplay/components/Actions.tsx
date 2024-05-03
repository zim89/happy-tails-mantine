import { Eye, Edit2, MoreHorizontal } from "lucide-react";
import { Button } from "@mantine/core"

export const Actions = () => {
    return (
        <div className="flex gap-4 justify-end">
            <Button classNames={{ root: 'border border-black w-9 p-0 rounded-[2px]' }}><Eye size={16} color="black"/></Button>
            <Button classNames={{ root: 'border border-black w-9 p-0 rounded-[2px]' }}><Edit2 size={16} color="black"/></Button>
            <Button classNames={{ root: 'border border-black w-9 p-0 rounded-[2px]' }}><MoreHorizontal size={16} color="black"/></Button>
        </div>
    )
}