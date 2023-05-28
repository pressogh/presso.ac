import { join } from 'path';
import fs from "fs";
import matter from 'gray-matter';
import {NextResponse} from "next/server";

const cwd = process.cwd();
const projectsDirectory = join(cwd, '_projects');

const getAllMdFiles = () => {
	return fs.readdirSync(projectsDirectory).filter((path) => /\.mdx?$/.test(path));
}

const parseMarkdown = (filename: string) => {
	const markdownWithMetadata = fs.readFileSync(
		join(projectsDirectory, filename),
		'utf-8'
	);
	
	const { data, content } = matter(markdownWithMetadata);
	return {
		...data,
		content,
	}
}

type Item = {
	[key: string]: string;
}

const getAllProjects = () => {
	const mdFiles = getAllMdFiles();
	
	const projects: Item[] = [];
	for (const file of mdFiles) {
		projects.push(parseMarkdown(file));
	}
	
	return projects;
}

export const GET = async () => {
	const projects = getAllProjects();
	return NextResponse.json(projects);
}
