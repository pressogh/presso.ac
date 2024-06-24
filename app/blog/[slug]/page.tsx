import dayjs from "dayjs";

import { compileMDX } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
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

dayjs.locale("ko");

const getData = async (slug: string) => {
	const post = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${slug}.mdx`).then((res) => res.text());

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
		const regex = /^resume\/posts\/.+\.mdx$/;

		return data.objects.filter((item: { name: string }) => {
			return regex.test(item.name);
		});
	});

	return posts.map((post: { name: string }) => {
		const last = post.name.split('/').pop();
		const file = last ? last.replace(/ /g, "-").replace(/\.mdx$/g, '') : '';

		return {
			slug: file
		}
	});
}

interface Params {
	params: {
		slug: string
	}
}

const Page = async ({ params }: Params) => {
	const { content, title, date }: any = await getData(params.slug);

	return (
		<Container>
			<div className={"sm:mt-20 mt-6"}>
				<TOC />

				<Header title={title} date={date} />

				<div className={`my-10`}>
					<Content data={content} />
				</div>

				<Comment />
			</div>
		</Container>
	);
};

export default Page;
