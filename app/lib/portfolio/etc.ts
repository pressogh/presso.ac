import { join } from 'path';
import fs from 'fs';
import { ProjectType } from '@/types/portfolio/ProjectType';

import { compileMDX } from 'next-mdx-remote/rsc';
import MDXComponents from '@/app/components/markdown/MDXComponents';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import LinkIcon from '@/app/components/markdown/LinkIcon';
import LinkIconGrid from '@/app/components/markdown/LinkIconGrid';

import { getAllMdFiles, parseMarkdown } from '@/app/lib/etc';
import { getPlaiceholder } from 'plaiceholder';
import dayjs from 'dayjs';

let customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.locale('ko');
dayjs.extend(customParseFormat);

const cwd = process.cwd();
const projectsDirectory = join(cwd, '/_projects');

export const getAllProjects = async () => {
	const mdFiles = getAllMdFiles(projectsDirectory);

	let projects: ProjectType[] = [];
	for (const file of mdFiles) {
		projects.push(
			(await parseMarkdown(join(projectsDirectory, file))) as ProjectType,
		);
	}

	projects = await Promise.all(
		projects.map(async (item, _) => {
			let blurDataURL = '';
			try {
				if (item.thumbnail) {
					const file = await fs.readFileSync(
						join('public', item.thumbnail),
					);
					const { base64 } = await getPlaiceholder(file);

					blurDataURL = base64;
				}
			} catch (e) {
				console.error(e);
			}

			return { ...item, blurDataURL };
		}),
	);

	projects.sort((a, b) => {
		const aStartDate = dayjs(a.startDate);
		const bStartDate = dayjs(b.startDate);

		if (!aStartDate) return 1;
		if (!bStartDate) return -1;

		return aStartDate.isBefore(bStartDate) ? 1 : -1;
	});

	return projects;
};

export const getProject = async (slug: string) => {
	const parsed = decodeURIComponent(slug);

	const markdownWithMetadata = fs.readFileSync(
		join(projectsDirectory, `${parsed}.mdx`),
		'utf-8',
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
			LinkIcon,
		},
	});

	return {
		...frontmatter,
		content,
	};
};
