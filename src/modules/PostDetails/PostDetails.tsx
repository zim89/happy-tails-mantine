'use client';

import { EditorContext } from "./components/EditorContext";
import { useFindOneQuery } from '@/shared/api/postApi';
import { FormProvider } from './lib/context';

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
		<FormProvider post={data}>
			<EditorContext />
		</FormProvider>
	);
}
