import { join } from 'path';
import fs from 'fs';
import dayjs from 'dayjs';

dayjs.locale('ko');

const cwd = process.cwd();
const aboutDirectory = join(cwd, '/_about');

export const getHeader = async () => {
	const data = fs.readFileSync(
		join(aboutDirectory, `/Header/data.json`),
		'utf-8',
	);

	return JSON.parse(data);
};

export const getWorkExperience = async () => {
	const data = fs.readFileSync(
		join(aboutDirectory, `/Work-Experience/data.json`),
		'utf-8',
	);

	return JSON.parse(data);
};

export const getOthers = async () => {
	const data = fs.readFileSync(
		join(aboutDirectory, `/Others/data.json`),
		'utf-8',
	);

	return JSON.parse(data);
};

export const getSkills = async () => {
	const data = fs.readFileSync(
		join(aboutDirectory, `/Skills/data.json`),
		'utf-8',
	);

	return JSON.parse(data);
};
