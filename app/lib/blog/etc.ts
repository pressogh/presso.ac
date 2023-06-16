import { join } from 'path';
import fs from "fs";

import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "@/app/components/markdown/MDXComponents";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import { getAllMdFiles, parseMarkdown } from "@/app/lib/etc";
import { PostType } from "@/types/PostType";
import Conclusion from "@/app/components/markdown/Conclusion";
import dayjs from "dayjs";

dayjs.locale('ko');

const cwd = process.cwd();
const postsDirectory = join(cwd, '/_posts');

export const getAllPosts = async () => {
	const mdFiles = getAllMdFiles(postsDirectory);

	const posts: PostType[] = [];
	for (const file of mdFiles) {
		posts.push(await parseMarkdown(join(postsDirectory, file)) as PostType);
	}
	
	posts.sort((a, b) => {
		if (!a.date) return 1;
		else if (!b.date) return -1;
		else {
			return dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1;
		}
	});

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
			Conclusion
		},
	});

	return {
		...frontmatter,
		content,
	}
}
