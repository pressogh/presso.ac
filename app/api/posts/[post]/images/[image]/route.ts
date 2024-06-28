import { NextResponse } from "next/server";

import { auth } from "@/app/auth";

// @ts-ignore
export const PUT = auth(async function PUT(request: Request, { params }: { params: { post: string, image: string } }) {
	const image = await request.blob();

	await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${encodeURIComponent(params.post)}/images/${params.image}`, {
		method: 'PUT',
		body: image,
		headers: {
			'Content-Type': 'image/*',
		}
	});

	return NextResponse.json({
		"url": process.env.NEXT_PUBLIC_API_URL + `/posts/${encodeURIComponent(params.post)}/images/${params.image}`,
		"status": 1
	})
});

export async function GET(request: Request, { params }: { params: { post: string, image: string } }) {
	const response = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${encodeURIComponent(params.post)}/images/${params.image}`);
	const image = await response.blob();

	return new NextResponse(image, {
		headers: {
			'Content-Type': 'image/*',
		}
	});
}
