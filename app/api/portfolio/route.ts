import { NextResponse } from "next/server";

import fs from "fs";
import dayjs from "dayjs";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";

import { ProjectType } from "@/types/portfolio/ProjectType";
import { getAllMdFiles, parseMarkdown } from "@/app/lib/etc";

dayjs.locale('ko');

export async function GET() {
	const cwd = process.cwd();
	const directory = join(cwd, '/_projects');

	const mdFiles = getAllMdFiles(directory);

	let projects: ProjectType[] = [];
	for (const file of mdFiles) {
		projects.push(
			(await parseMarkdown(join(directory, file))) as ProjectType,
		);
	}

	projects = await Promise.all(
		projects.map(async (item, _) => {
			let blurDataURL = '';
			try {
				if (item.thumbnail) {
					const file = fs.readFileSync(
						join('public', item.thumbnail)
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

	return NextResponse.json(projects);
}
