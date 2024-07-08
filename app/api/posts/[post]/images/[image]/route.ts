import { NextResponse } from "next/server";

import * as common from 'oci-common';
import * as os from 'oci-objectstorage';

import { auth } from "@/app/auth";

// @ts-ignore
export const PUT = auth(async function PUT(request: Request, { params }: { params: { post: string, image: string } }) {
	const image = await request.blob();

	await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}/resume/posts/${encodeURIComponent(params.post)}/images/${params.image}`, {
		method: 'PUT',
		body: image,
		headers: {
			'Content-Type': 'image/*',
		}
	});

	return NextResponse.json({
		"url": `/api/posts/${encodeURIComponent(params.post)}/images/${params.image}`,
		"status": 1
	})
});

export async function GET(request: Request, { params }: { params: { post: string, image: string } }) {
	const response = await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}/resume/posts/${encodeURIComponent(params.post)}/images/${params.image}`);
	const image = await response.blob();

	return new NextResponse(image, {
		headers: {
			'Content-Type': 'image/*',
		}
	});
}

// @ts-ignore
export const PATCH = auth(async function PATCH(request: Request, { params }: { params: { post: string, image: string } }) {
	const data = await request.json();

	const provider = new common.ConfigFileAuthenticationDetailsProvider();

	const client = new os.ObjectStorageClient({ authenticationDetailsProvider: provider });
	const renameObjectRequest: os.requests.RenameObjectRequest = {
		bucketName: process.env.BUCKET_NAME || '',
		namespaceName: process.env.BUCKET_NAMESPACE || '',
		renameObjectDetails: {
			sourceName: `resume/posts/${params.post}/images/${params.image}`,
			newName: `resume/posts/${data.newTitle}/images/${params.image}`,
		},
	};

	await client.renameObject(renameObjectRequest);

	return NextResponse.json({
		"status": 1
	})
});
