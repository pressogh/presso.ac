import { join } from 'path';
import fs from "fs";
import dayjs from "dayjs";

dayjs.locale('ko');

const cwd = process.cwd();
const aboutDirectory = join(cwd, '/_about');

export const getAbout = async () => {
	const data = fs.readFileSync(
		join(aboutDirectory, `/Work-Experience/data.json`),
		'utf-8'
	);

	return JSON.parse(data);
}
