import { NextRequest, NextResponse } from "next/server";

import dayjs from "dayjs";
import { join } from "path";

import { getAllMdFiles, parseMarkdown } from "@/app/lib/etc";
import { PostType } from "@/types/blog/PostType";

dayjs.locale('ko');

export async function GET() {
	const cwd = process.cwd();
	const directory = join(cwd, '/_posts');

	const mdFiles = getAllMdFiles(directory);

	const posts: PostType[] = [];
	for (const file of mdFiles) {
		posts.push(await parseMarkdown(join(directory, file)) as PostType);
	}

	posts.sort((a, b) => {
		if (!a.date) return 1;
		else if (!b.date) return -1;
		else {
			return dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1;
		}
	});

	return NextResponse.json(posts);
}
