import { join } from 'path';
import fs from "fs";
import { ProjectType } from "@/types/ProjectType";

import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "@/app/components/MDXComponents";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import LinkIcon from "@/app/components/portfolio/LinkIcon";
import LinkIconGrid from "@/app/components/portfolio/LinkIconGrid";
import {getAllMdFiles, parseMarkdown} from "@/app/lib/etc";

const cwd = process.cwd();
const projectsDirectory = join(cwd, '/_projects');

export const getAllProjects = async () => {
	const mdFiles = getAllMdFiles(projectsDirectory);
	
	const projects: ProjectType[] = [];
	for (const file of mdFiles) {
		projects.push(await parseMarkdown(join(projectsDirectory, file)) as ProjectType);
	}
	
	projects.sort((a, b) => {
		if (!a.displayPriority) return 1;
		if (!b.displayPriority) return -1;
		
		return parseInt(a.displayPriority) - parseInt(b.displayPriority);
	});
	
	return projects;
}

export const getProject = async (slug: string) => {
	const parsed = decodeURIComponent(slug);
	
	const markdownWithMetadata = fs.readFileSync(
		join(projectsDirectory, `${parsed}.mdx`),
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
			LinkIconGrid,
			LinkIcon
		},
	});
	
	return {
		...frontmatter,
		content,
	}
}
