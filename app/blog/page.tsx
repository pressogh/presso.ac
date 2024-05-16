import Container from "@/app/components/Container";
import { PostType } from "@/types/blog/PostType";
import PostGrid from "@/app/components/blog/PostGrid";

const getData = async () => {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`).then((res) => res.json());
}

export const dynamic = "force-dynamic";

const Page = async () => {
	const posts: PostType[] = await getData();

	return (
		<Container>
			<div className={`sm:mt-20 mt-6`}>
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
