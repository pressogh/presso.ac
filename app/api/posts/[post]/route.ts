import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { auth } from "@/app/auth";

// @ts-ignore
export const DELETE = auth(async function DELETE(request: Request, { params }: { params: { post: string } }) {
	// TODO: Delete the post

	return NextResponse.json({
		"status": 1
	})
});
