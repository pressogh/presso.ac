import {join} from 'path';
import fs from "fs";
import matter from 'gray-matter';
import {ProjectType} from "@/types/ProjectType";

const cwd = process.cwd();
const projectsDirectory = join(cwd, '_projects');

import rehypeExternalLinks from 'rehype-external-links';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const getAllMdFiles = () => {
	return fs.readdirSync(projectsDirectory).filter((path) => /\.md?$/.test(path));
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
	
	return projects;
}

export const getProject = async (slug: string) => {
	const parsed = decodeURIComponent(slug);
	
	const markdownWithMetadata = fs.readFileSync(
		join(projectsDirectory, `${parsed}.md`),
		'utf-8'
	);
	
	const { data, content } = matter(markdownWithMetadata);
	return {
		...data,
		content,
	}
}

export const markdownToHtml = async (markdown: string) => {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeSlug)
		.use(rehypePrism, { ignoreMissing: true })
		.use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferer'] })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);
	return result.toString();
}
