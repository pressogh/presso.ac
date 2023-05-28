import {NextResponse} from "next/server";
import {join} from "path";
import matter from "gray-matter";
import fs from "fs";

const cwd = process.cwd();
const projectsDirectory = join(cwd, '_projects');

const getProject = (slug: string) => {
	const markdownWithMetadata = fs.readFileSync(
		join(projectsDirectory, `${slug}.mdx`),
		'utf-8'
	);
	
	const { data, content } = matter(markdownWithMetadata);
	return {
		...data,
		content,
	}
}

export const GET = async (
	request: Request,
	params: { slug: string }
) => {
	const projects = getProject(params.slug);
	console.log(projects);
	return NextResponse.json(projects);
}
