'use client';

import EditorWrapper from "@/modules/EditorWrapper";
import PostEditor from "@/modules/PostEditor";
import { Details } from "./components/Details";
import { Header } from "./components/Header";
import ImageBox from "@/modules/ImageBox";
import { useSelectPosts } from "@/shared/hooks/useSelectPosts";

type Props = {
	postId: string;
}
export default function PostDetails({ postId }: Props) {
	const post = useSelectPosts(posts => posts.find(post => post.id === Number(postId)));

	return (
		<>
			{post && <EditorWrapper>
				{(editor) => <>
					<Header editor={editor} post={post} />
					<div className="flex flex-col lg:flex-row gap-16">
						<PostEditor editor={editor} />
						<div className="flex-1">
							<Details status={post.postStatus} />
							<ImageBox />
						</div>
					</div>
				</>}
			</EditorWrapper>}
		</>
	);
}
