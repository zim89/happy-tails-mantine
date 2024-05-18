import Breadcrumbs from "@/components/Breadcrumbs";
import NewBlog from "@/modules/NewBlog";

export default function Page() {
    return (
        <>
            <Breadcrumbs
				crumbs={[
					{ href: '/admin/', text: 'Dashboard' },
					{ text: 'Blogs', href: '/admin/blogs/' },
					{ text: 'New post' },
				]}

				classNames={{
					root: "p-0 m-0 mb-8"
				}}
			/>

            <NewBlog />
        </>
    );
}