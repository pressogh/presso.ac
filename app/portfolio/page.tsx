import {ProjectType} from "@/types/portfolio/ProjectType";

import Container from "@/app/components/Container";
import ProjectGrid from "@/app/components/markdown/ProjectGrid";

import fs from "fs";
import { join } from "path";
import dayjs from "dayjs";
import matter from "gray-matter";
import { getPlaiceholder } from "plaiceholder";

export const metadata = {
	title: 'PORTFOLIO | Kanghyoek Lee',
	description: '지금까지 진행한 프로젝트들을 정리했습니다.',
	keywords: ['이강혁', 'PRESSO', "포트폴리오", "PORTFOLIO", "개발자", "Kanghyoek Lee"],
	authors: [{ name: '이강혁', url: 'https://presso.ac' }],
	creator: '이강혁',
	publisher: '이강혁'
}

const getData = async () => {
	const mdFiles = await fetch(`${process.env.RESUME_BUCKET_URL}`).then(async (res) => {
		const data = await res.json();
		const regex = /^resume\/projects\/.+\.mdx$/;

		return data.objects.filter((item: { name: string }) => {
			return regex.test(item.name);
		});
	});

	let projects: ProjectType[] = await Promise.all(
		mdFiles.map(async (item: { name: string }) => {
			const file = item.name.split('/').pop();
			const project = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/projects/${encodeURI(file ? file : '')}`).then((res) => res.text());

			const { data } = matter(project);
			return {
				...data,
			}
		})
	);

	projects = await Promise.all(
		projects.map(async (item, _) => {
			let blurDataURL = '';
			try {
				if (item.thumbnail) {
					const file = fs.readFileSync(
						join('public/', item.thumbnail)
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
}

const Page = async () => {
	const projects: ProjectType[] = await getData();

	return (
		<Container>
			<div className={`font-light sm:text-xl mt-10 text-md`}>
				지금까지 총 <span className={`font-medium`}>{projects.length}</span>개의 프로젝트를 진행했어요.
			</div>
			<hr className={`mt-3 mb-10`} />
			<ProjectGrid projects={projects} />
		</Container>
	);
};

export default Page;
