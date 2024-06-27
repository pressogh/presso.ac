import dayjs from "dayjs";

import {compileMDX} from "next-mdx-remote/rsc";
import {serialize} from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

import TOC from "@/app/components/blog/TOC";
import Comment from "@/app/components/blog/Comment";
import Header from "@/app/components/blog/Header";
import Content from "@/app/components/blog/Content";
import Container from "@/app/components/Container";
import Conclusion from "@/app/components/markdown/Conclusion";
import MDXComponents from "@/app/components/markdown/MDXComponents";
import {notFound} from "next/navigation";
import {ApiError} from "next/dist/server/api-utils";

dayjs.locale("ko");

const getData = async (slug: string) => {
	const post = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${slug}/data.mdx`)
		.then((res) => {
			if (!res.ok) throw new ApiError(404, 'Not Found');
			return res.text();
		})
		.catch((e: ApiError) => {
			if (e.statusCode === 404) return notFound();
			throw e;
		});

	const { frontmatter } = await compileMDX({
		source: post,
		options: {
			parseFrontmatter: true
		}
	});

	return {
		...frontmatter,
		content: await serialize(post, {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				// @ts-ignore
				rehypePlugins: [rehypePrism, rehypeSlug],
			},
			parseFrontmatter: true,
			components: {
				...MDXComponents({}),
				Conclusion
			}
		})
	};
}

export async function generateStaticParams() {
	const posts = await fetch(`${process.env.RESUME_BUCKET_URL}`).then(async (res) => {
		const data = await res.json();
		const regex = /^resume\/posts\/.+\/.+\.mdx$/;

		return data.objects.filter((item: { name: string }) => {
			return regex.test(item.name);
		});
	});

	return posts.map((post: { name: string }) => {
		const path = post.name.split('/');

		path.pop();
		const uri = path.pop();

		if (!uri) return notFound();

		return {
			slug: encodeURI(uri)
		}
	});
}

interface Params {
	params: {
		slug: string
	}
}

const Page = async ({ params }: Params) => {
	const { content, title, date, description }: any = await getData(params.slug);

	return (
		<Container>
			<div className={"sm:mt-20 mt-6"}>
				<TOC />

				<Header title={title} date={date} description={description} />

				<div className={`my-10`}>
					<Content data={content} />
				</div>

				<Comment />
			</div>
		</Container>
	);
};

export default Page;
