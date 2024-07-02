import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { compileMDX } from "next-mdx-remote/rsc";

import * as common from 'oci-common';
import * as os from 'oci-objectstorage';

import { auth } from "@/app/auth";

export async function GET(request: Request, { params }: { params: { post: string } }) {
	const response = await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}/resume/posts/${encodeURIComponent(params.post)}/data.mdx`);
	const data = await response.text();

	const { frontmatter } = await compileMDX({
		source: data,
		options: {
			parseFrontmatter: true
		}
	});

	// frontmatter를 찾기 위한 정규 표현식
	const frontmatterPattern = /^---[\s\S]*?---\n/;

	// frontmatter 제거
	const content = data.replace(frontmatterPattern, '');

	return NextResponse.json({
		...frontmatter,
		markdown: content
	});
}

// @ts-ignore
export const DELETE = auth(async function DELETE(request: Request, { params }: { params: { post: string } }) {
	const provider = new common.ConfigFileAuthenticationDetailsProvider();

	const client = new os.ObjectStorageClient({ authenticationDetailsProvider: provider });
	const deleteObjectRequest: os.requests.DeleteObjectRequest = {
		objectName: `resume/posts/${params.post}/data.mdx`,
		bucketName: process.env.BUCKET_NAME || '',
		namespaceName: process.env.BUCKET_NAMESPACE || '',
	};

	await client.deleteObject(deleteObjectRequest);

	revalidatePath(`/blog`);

	return NextResponse.json({
		"status": 1
	})
});


