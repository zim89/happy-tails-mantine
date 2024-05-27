"use client";

import { useFindOneQuery } from "@/shared/api/postApi";
import { PostFormProvider } from "@/shared/lib/context";

type Props = {
	children: React.ReactNode;
	params: { id: string }
}

export default function Layout({ children, params }: Props) {
	const { data, isLoading, error } = useFindOneQuery({ id: params.id });

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>{
		"Whoops, it shouldn't have happened, our experts are already fixing this!"
	}</p>

	return (
		<PostFormProvider post={data}>
			{children}
		</PostFormProvider>
	);
}