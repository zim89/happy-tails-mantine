'use client';

import EditorContext from "@/modules/EditorWrapper";
import { PostFormProvider } from '@/shared/lib/context';
import PostEditor from "@/modules/PostEditor";
import ImageBox from "@/modules/ImageBox";
import { Details } from "./components/Details";
import { Header } from "./components/Header";

export default function NewBlog() {
	return (
		<PostFormProvider>
			<EditorContext>
				{(editor) => <>
                    <Header editor={editor}/>
					<div className="flex flex-col lg:flex-row gap-16">
						<PostEditor editor={editor} />

						<div className="flex-1">
							<Details />
							<ImageBox />
						</div>
					</div>
				</>}
			</EditorContext>
		</PostFormProvider>
	);
}
