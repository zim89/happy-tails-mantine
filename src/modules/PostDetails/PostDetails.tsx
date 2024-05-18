'use client';

import EditorContext from "@/modules/EditorWrapper";
import { useFindOneQuery } from '@/shared/api/postApi';
import { PostFormProvider } from '@/shared/lib/context';
import PostEditor from "@/modules/PostEditor";
import { Details } from "./components/Details";
import { Header } from "./components/Header";
import ImageBox from "@/modules/ImageBox";

type Props = {
	id: string;
};

export default function PostDetails({ id }: Props) {
	const { data, isLoading, error } = useFindOneQuery({ id });

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>{
		"Whoops, it shouldn't have happened, our experts are already fixing this!"
	}</p>

	return (
		<>
			{data && (
				<PostFormProvider post={data}>
					<EditorContext>
						{(editor) => <>
							<Header editor={editor} post={data} />
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
			)}
		</>
	);
}
