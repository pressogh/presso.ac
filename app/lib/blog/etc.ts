import { join } from 'path';
import fs from "fs";

import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "@/app/components/MDXComponents";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import { getAllMdFiles, parseMarkdown } from "@/app/lib/etc";
import { PostType } from "@/types/PostType";

const cwd = process.cwd();
const postsDirectory = join(cwd, '/_posts');

export const getAllPosts = async () => {
	const mdFiles = getAllMdFiles(postsDirectory);
	
	const posts: PostType[] = [];
	for (const file of mdFiles) {
		posts.push(await parseMarkdown(join(postsDirectory, file)) as PostType);
	}
	
	return posts;
}

export const getPost = async (slug: string) => {
	const parsed = decodeURIComponent(slug);
	
	const markdownWithMetadata = fs.readFileSync(
		join(postsDirectory, `${parsed}.mdx`),
		'utf-8'
	);
	
	const { content, frontmatter } = await compileMDX({
		source: markdownWithMetadata,
		options: {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypePrism, rehypeSlug],
			},
			parseFrontmatter: true,
		},
		components: {
			...MDXComponents({}),
		},
	});
	
	return {
		...frontmatter,
		content,
	}
}
