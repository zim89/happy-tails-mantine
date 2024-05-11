"use client";

import { useContext } from "react";

// @tiptap editor's libs and components
import { useEditor } from '@tiptap/react';
import { Link } from '@mantine/tiptap';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';

import { FontFamily, FontSize } from '@/shared/lib/utils';
import { PostEditor } from "./PostEditor";
import { Header } from "./Header";
import { Details } from "./Details";
import { FeaturedImage } from "./FeaturedImage";
import { FormContext } from "../lib/context";

export const EditorContext = () => {
    const { form } = useContext(FormContext);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            TextStyle,
            Color,
            Image,
            FontSize,
            FontFamily,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: form.values.content,
        onUpdate: ({ editor }) => form.setFieldValue("content", editor.getHTML()),
    });

    if (!editor) return null;

    return (
        <>
            <Header editor={editor} />
            <div className="flex flex-col lg:flex-row gap-16">
                <PostEditor editor={editor} />

                <div className="flex-1">
                    <Details />
                    <FeaturedImage />
                </div>
            </div>
        </>
    );
}