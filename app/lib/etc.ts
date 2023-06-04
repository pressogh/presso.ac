import fs from "fs";
import matter from "gray-matter";

const getAllMdFiles = (directory: string) => {
	return fs.readdirSync(directory).filter((path) => /\.mdx?$/.test(path));
}

const parseMarkdown = async (path: string) => {
	const markdownWithMetadata = fs.readFileSync(path, 'utf-8');
	
	const { data } = matter(markdownWithMetadata);
	return {
		...data,
	}
}

export { getAllMdFiles, parseMarkdown };
