import { NextRequest, NextResponse } from 'next/server'

import fs from "fs";
import { join } from "path";

export async function GET(request: NextRequest) {
	const cwd = process.cwd();
	const directory = join(cwd, '/_about');

	const query = request.nextUrl.searchParams.get('query');

	const data = fs.readFileSync(
		join(directory, `/${query}/data.json`),
		'utf-8',
	);

	return NextResponse.json(JSON.parse(data));
}

