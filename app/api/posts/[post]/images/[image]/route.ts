import {NextResponse} from "next/server";

export async function PUT(request: Request, { params }: { params: { post: string, image: string } }) {
	const image = await request.blob();

	const response = await fetch(`${process.env.RESUME_BUCKET_URL}/resume/posts/${encodeURI(params.post)}/images/${params.image}`, {
		method: 'PUT',
		body: image,
		headers: {
			'Content-Type': 'image/jpeg',
		}
	})

	return NextResponse.json({
		"url": response.url,
		"status": 1
	})
}
