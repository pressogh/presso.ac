import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	const title = data.title;
	const mdx = data.data;

	const response = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${encodeURI(title)}/data.mdx`, {
		method: 'PUT',
		body: mdx,
		headers: {
			'Content-Type': 'text/plain',
		}
	})

	return NextResponse.json({
		"url": response.url,
		"status": 1
	})
}
