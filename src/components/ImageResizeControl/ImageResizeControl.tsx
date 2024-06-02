"use client";

import { useState } from "react";
import { Button, Slider } from "@mantine/core";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";

import { sharedProps } from "@/modules/PostEditor";

export default function ImageResizeControl() {
    const { editor } = useRichTextEditorContext();
    // const [scale, setScale] = useState(editor?.state.selection?.node.attrs?.scale || 0);

    return (
        <RichTextEditor.Control>
            {/* <Slider size="sm" value={scale} onChange={setScale} min={0} max={1}/> */}
            <Button onClick={() => editor?.chain().focus().resizeImage(0.5).run()}>Resize</Button>
        </RichTextEditor.Control>
    );
}