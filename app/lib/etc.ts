import {join} from 'path';
import fs from "fs";
import matter from 'gray-matter';
import {ProjectType} from "@/types/ProjectType";

const cwd = process.cwd();
const projectsDirectory = join(cwd, '_projects');

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

type Item = {
	[key: string]: string;
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
