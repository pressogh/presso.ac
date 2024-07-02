import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { auth } from "@/app/auth";

export const POST = auth(async function POST(request: Request) {
	const data = await request.json();
	const title = data.title;
	const mdx = data.data;

	const response = await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}/resume/posts/${encodeURIComponent(title)}/data.mdx`, {
		method: 'PUT',
		body: mdx,
		headers: {
			'Content-Type': 'text/plain, charset=utf-8',
		}
	});

	revalidatePath(`/blog`);
	revalidatePath(`/blog/${encodeURIComponent(title)}`);

	return NextResponse.json({
		"url": response.url,
		"status": 1
	})
});
