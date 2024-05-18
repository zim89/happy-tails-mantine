import Breadcrumbs from "@/components/Breadcrumbs";
import PostDetails from "@/modules/PostDetails";

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

			<PostDetails id={id} />
		</>
	);
}