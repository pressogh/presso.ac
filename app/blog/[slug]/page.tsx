import {getAllPosts, getPost} from "@/app/lib/blog/etc";

const dynamicParams = false;
export { dynamicParams };

export const generateStaticParams = async () => {
	const posts = await getAllPosts();
	
	return posts.map((item) => {
		return {
			slug: item.title.replace(/ /g, "-")
		};
	});
}

interface Params {
	params: {
		slug: string
	}
}

const Page = async ({ params }: Params) => {
	const { title, date, content }: any = await getPost(params.slug);
	
	return (
		<div>
			{ title }
		</div>
	);
};

export default Page;
