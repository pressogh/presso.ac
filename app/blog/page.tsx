import matter from "gray-matter";
import dayjs from "dayjs";

import { PostType } from "@/types/blog/PostType";

import Container from "@/app/components/Container";
import PostGrid from "@/app/components/blog/PostGrid";

export const metadata = {
	title: 'BLOG | Kanghyoek Lee',
	description: '공유하고 싶거나 다시 보고 싶은 기술들을 정리했습니다.',
	keywords: ['이강혁', 'PRESSO', "블로그", "BLOG", "개발자"],
	authors: [{ name: '이강혁', url: 'https://presso.ac' }],
	creator: '이강혁',
	publisher: '이강혁'
}

const getData = async () => {
	const mdFiles = await fetch(`${process.env.RESUME_BUCKET_URL}`, { next: { revalidate: 3600 } }).then(async (res) => {
		const data = await res.json();
		const regex = /^resume\/posts\/.+\/.+\.mdx$/;

		return data.objects.filter((item: { name: string }) => {
			return regex.test(item.name);
		});
	});

	const posts: PostType[] = await Promise.all(
		mdFiles.map(async (item: { name: string }) => {
			const path = item.name.split('/');

			path.pop();
			const folder = path.pop();

			const post = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${encodeURIComponent(folder ? folder : '')}/data.mdx`, { next: { revalidate: 3600 } }).then((res) => res.text());

			const { data } = matter(post);
			return {
				...data,
			}
		})
	);

	posts.sort((a, b) => {
		if (!a.date) return 1;
		else if (!b.date) return -1;
		else {
			return dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1;
		}
	});

	return posts;
}

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
