import { join } from 'path';
import fs from "fs";
import matter from 'gray-matter';
import { ProjectType } from "@/types/ProjectType";

import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "@/app/mdx-components";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import LinkIcon from "@/app/components/portfolio/LinkIcon";
import LinkIconGrid from "@/app/components/portfolio/LinkIconGrid";

const cwd = process.cwd();
const projectsDirectory = join(cwd, '/_projects');

const getAllMdFiles = () => {
	return fs.readdirSync(projectsDirectory).filter((path) => /\.mdx?$/.test(path));
}

const parseMarkdown = async (filename: string) => {
	const markdownWithMetadata = fs.readFileSync(
		join(projectsDirectory, filename),
		'utf-8'
	);
	
	const { data } = matter(markdownWithMetadata);
	return {
		...data,
	}
}

export const getAllProjects = async () => {
	const mdFiles = getAllMdFiles();
	
	const projects: ProjectType[] = [];
	for (const file of mdFiles) {
		projects.push(await parseMarkdown(file) as ProjectType);
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
