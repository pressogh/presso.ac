import { compileMDX } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

import Container from "@/app/components/Container";
import Content from "@/app/components/portfolio/Content";
import Header from "@/app/components/portfolio/Header";

const getData = async (slug: string) => {
	const project = await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}/resume/projects/${slug}.mdx`).then((res) => res.text());

	const { frontmatter } = await compileMDX({
		source: project,
		options: {
			parseFrontmatter: true
		}
	});

	return {
		...frontmatter,
		content: await serialize(project, {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypePrism, rehypeSlug],
			},
			parseFrontmatter: true
		})
	};
}

export async function generateStaticParams() {
	const projects = await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}`).then(async (res) => {
		const data = await res.json();
		const regex = /^resume\/projects\/.+\.mdx$/;

		return data.objects.filter((item: { name: string }) => {
			return regex.test(item.name);
		});
	});

	return projects.map((project: { name: string }) => {
		const last = project.name.split('/').pop();
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
	const { name, description, tags, startDate, endDate, content }: any = await getData(params.slug);

	return (
		<Container>
			<div className={"sm:mt-20 mt-6"}>
				<Header name={name} description={description} tags={tags} startDate={startDate} endDate={endDate} />

				<div className={`mt-10`}>
					<Content data={content} />
				</div>
			</div>
		</Container>
	);
};

export default Page;
