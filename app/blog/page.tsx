import Container from "@/app/components/Container";
import { getAllPosts } from "@/app/lib/blog/etc";
import { PostType } from "@/types/PostType";
import PostGrid from "@/app/components/blog/PostGrid";

const Page = async () => {
	const posts: PostType[] = await getAllPosts();
	
	return (
		<Container>
			<div className={`mt-20`}>
				<div className={`text-5xl font-bold`}>Blog</div>
				<div className={`text-xl font-thin my-4`}>공유하고 싶거나 다시 보고 싶은 기술들을 정리합니다.</div>
				<div className={`mt-8`}>
					<PostGrid posts={posts} />
				</div>
			</div>
		</Container>
	);
};

export default Page;
