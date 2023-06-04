import Container from "@/app/components/Container";
import { getAllPosts } from "@/app/lib/blog/etc";
import { PostType } from "@/types/PostType";
import PostGrid from "@/app/components/blog/PostGrid";

const Page = async () => {
	const posts: PostType[] = await getAllPosts();
	
	return (
		<>
			<Container>
				<div className={`mt-10`}>
					<PostGrid posts={posts} />
				</div>
			</Container>
		</>
	);
};

export default Page;
