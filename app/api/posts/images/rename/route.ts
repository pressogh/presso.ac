import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	const sourceName = data.sourceName;
	const targetName = data.targetName;

	const response = await fetch(`${process.env.RESUME_BUCKET_URL}/actions/renameObject`, {
		method: 'POST',
		body: JSON.stringify({
			sourceName,
			newName: targetName,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return NextResponse.json({
		"status": 1
	});
}
