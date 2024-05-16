import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import { join } from "path";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import { compileMDX } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

import Conclusion from "@/app/components/markdown/Conclusion";
import MDXComponents from "@/app/components/markdown/MDXComponents";

export async function GET(request: NextRequest, { params: { slug } }: Pick<{ params: { slug: string } }, 'params'>) {
	const cwd = process.cwd();
	const directory = join(cwd, '/_posts');

	const parsed = decodeURIComponent(slug);

	const markdownWithMetadata = fs.readFileSync(
		join(directory, `${parsed}.mdx`),
		'utf-8'
	);

	const { frontmatter } = await compileMDX({
		source: markdownWithMetadata,
		options: {
			parseFrontmatter: true
		}
	});

	return NextResponse.json({
		...frontmatter,
		content: await serialize(markdownWithMetadata, {
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
	});
}
