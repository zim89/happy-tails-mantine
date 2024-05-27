import { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import PostDetails from "@/modules/PostDetails";

export const metadata: Metadata = {
	title: "Blog Page",
	robots: {
		index: false
	}
}

type Props = {
	params: { id: string }
}
export default function Page({ params: { id } }: Props) {
	return (
		<>
			<Breadcrumbs
				crumbs={[
					{ href: '/admin/', text: 'Dashboard' },
					{ text: 'Blogs', href: '/admin/blogs/' },
					{ text: 'Blog post' },
				]}

				classNames={{
					root: "p-0 m-0 mb-8"
				}}
			/>

			<PostDetails postId={id}/>
		</>
	);
}